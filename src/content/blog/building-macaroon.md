---
title: Building Macaroon
excerpt: 'A reflection; or: there is no one to blame but me. (All this to avoid Swift?)'
tags:
  - side-projects
  - software
slug: building-macaroon
published: 2026-05-02
---

I love listening to music with [Roon](https://roon.app/en/). I also like seeing the name of the current track I'm listening to in the menu bar. None of the apps I've used in the past to perform this function (e.g. [MusicBar](https://github.com/DimitarNestorov/MusicBar) and [SpotMenu](https://github.com/kmikiy/SpotMenu)) support Roon, though, so I made my own: Macaroon.

You can read about the app's *raison d'être* and feature set [here](/posts/introducing-macaroon-a-macos-menu-bar-app-for-roon). This post will focus on the strategic and technical choices made while building the app.

<figure><img src="/assets/macaroon-example.png" alt="An example of Macaroon displaying a track name, artist name, and album art" /><figcaption>An example of Macaroon displaying a track name, artist name, and album art</figcaption></figure>

## Why the Lack of Existing Roon Solutions?

Why don't these existing apps support Roon? It is a niche piece of software, for sure, but is Roon really more niche than [Auryo](https://github.com/sneljo1/auryo) or [IINA](https://iina.io/) — both of which MusicBar supported? 

I very much doubt that. Roon is successful enough that it was [acquired by Harmon International](https://community.roonlabs.com/t/roon-acquired-by-harman-international/257414),  the makers of Harman/Kardon (now owned by Samsung), in 2023. 

The reason likely lies in the fact that Roon supports multi-device/multi-zone streaming (similar to Sonos), which means that determining what Roon is currently playing is more complex than something like Apple Music or Spotify. To make multi-device/multi-zone streaming work, Roon uses a client/server model, where each Roon client (the app running on your computer, a networked speaker, etc.) connects to a Roon Core server over the network. The client can make requests to the server and subscribe to a stream of updates via WebSockets. 

That setup is much more complicated than a standard media player and I can attest that it has been a pain in the ass to integrate.

## The Existing Options

From my (Claude-assisted) research, the existing Now Playing menu bar apps fall into two buckets: those that use macOS's private `MRMediaRemote` API and those that use AppleScript.

### `MRMediaRemote`

`MRMediaRemote` is a private macOS API that exposed to the data macOS used for its own Now Playing widget. Therefore, the "universal" Now Playing apps (i.e. apps that support multiple media players) like MusicBar leveraged this private API to provide their functionality.

Relying on a private API is a risky business. `MRMediaRemote` worked well enough for years, but Apple cut off non-Apple access to it entirely in macOS 15.4, effectively killing this category of app.

### AppleScript

Thanks to macOS's Open Scripting Architecture, apps like Spotify can expose internal data (e.g. the current track) via an AppleScript dictionary. Apps like SpotMenu build directly of these dictionaries to provide their Now Playing functionality.

Unfortunately, Roon doesn't ship with an AppleScript dictionary, rendering this approach dead on arrival.

## Leaning into Roon's Nature

While neither of the existing approaches work with Roon, its multi-device/multi-zone complexity gave us another option. 

Roon has a plugin architecture that allows developers to hook into and extend the media player's functionality.  It also provides [a well-maintained JavaScript library](https://github.com/RoonLabs/node-roon-api) for accessing the API that the Roon network uses to manage its multi-device/multi-zone playback, which those plugins can use to interface with your Roon Core over the network. 

Designing Macaroon as a Roon extension lets us lean into its networked nature and support multi-device/multi-zone playback, and gives us access to devices and zones other than the Roon client we have Macaroon running on. This approach is the recommended way to integrate with Roon and fits our use case perfectly. 

## Going Native?

But that extension, and the Node server to communicate with Roon, still has to run on a Mac. 

Theoretically we could rewrite the `node-roon-api` library to avoid the JavaScript dependency's impact on our system, but Roon's protocols and APIs aren't documented outside the library's implementation. Since this is a pretty niche side project, it made sense to limit the novel things we would have to build to get it working, so the initial version will rely on Node.

To that end, there were three mainstream-adjacent options that would give us access to Node:
 
- Electron
- Swift + SwiftNode
- Rust (Tauri) + Node

Electron was my initial choice because I'm very familiar with JavaScript and an all-JavaScript stack would have been ideal. However, Electron is an exceedingly heavy framework with noticeable performance and efficiency issue. Those tradeoffs may make sense for an extremely useful piece of software, but not for a simple menu bar app.

Writing a native app in Swift made sense in the abstract, and there is even [an active project](https://github.com/kabiroberai/node-swift) that bridges Swift and NodeJs, but I'm very unfamiliar with Apple's language and tools and — as mentioned above — I was trying to limit the amount of novel things necessary to finish this project. (Though, if I'm being honest, Swift was probably the "correct" choice in a vacuum and I might attempt a rewrite at some point.)

Therefore, I ended up with the Tauri framework in Rust, a language with which I had at least a passing familiarity. It gives us access to the macOS's native APIs (e.g. `NSStatusItem`) we need and allows use to run a Node sidecar process to manage the communication with Roon.

Spoiler alert: Swift was probably the better choice. 

## Tradeoffs All the Way Down

The choice of Rust and [the Tauri framework](https://v2.tauri.app/) for native Rust applications came with two categories of tradeoffs: managing the sidecar process and Tauri's inexact abstractions of macOS's APIs.

### Managing the Node Sidecar

A sidecar process, by definition, is a separate process from the one in which we're running our main application. This led to a series of Node lifecycle management and inter-process communication (IPC) requirements for our Rust application that wouldn't have been necessary if everything was running in the same process. SwiftNode, on the other hand, runs node in the same process, which allows Swift to call Node directly, avoiding IPC altogether (but with its own set of tradeoffs).

Most of this complexity comes down to two things: keeping the processes in sync and making sure they die together.

For communication, the Rust app and Node sidecar use a line-based JSON protocol over `stdout`. Each message from the sidecar — a track update, a zone list change, a connection status — is a single line of JSON. This is simple and language-agnostic, but it means everything has to be serialized across the boundary because, while Node handles the communication with Roon, Rust/Tauri control the display behavior of the menu bar app itself.

Lifecycle management is less straightforward. Even though our Rust app spawns the child process in which Node runs, that child process doesn't have an explicit dependency on the parent Rust process. This means that a child process can easily outlive its parent and become a zombie. For example, if the Rust app crashes, the Node sidecar has no inherent reason to stop — it'll happily keep running as an orphan, invisibly consuming resources but providing no value. 

Macaroon handles this by holding onto the sidecar's `stdin` handle on the Rust side: not to write to it, but as a liveness signal. If the Rust process dies for any reason, the handle drops, the pipe closes, and the Node process detects the closed `stdin` and shuts itself down. And when the sidecar crashes on its own (which can happen when the Roon Core disappears during the computer's sleep/wake cycle) the Rust side detects the broken pipe, updates the menu bar to show a disconnected state, and schedules a restart with exponential back off. 

Again, none of this would be necessary if both runtimes lived in the same process. But the good news is that these are the kind of boilerplate-adjacent tasks that are perfect for a coding agent to solve. Thanks, Claude!

### Tauri != Native

While Tauri is a mature framework, it is still a set of abstractions built upon macOS's native API.  That means that there will be friction between Tauri's wrappers and macOS's native functionality — that friction is typically difficult to notice, but sometimes it is too significant to ignore. 

While IPC management wasn't necessarily a dealbreaker, these Tauri limitations are the reason why I would consider a rewrite in Swift. 

#### Detecting Light and Dark Modes

The first bit of friction I noticed was when trying to handle a change between Light and Dark Mode. In macOS, the switch between modes propagates an event that Swift is able to respond to, while Tauri relies on a crate like `dark-light` to poll macOS for the current mode. Not the worst thing in the world (since users rarely switch between Light and Dark modes) but it makes this Tauri app feel distinctly non-native. 

#### Rebuilding Menus

As a menu bar app, Macaroon relies heavily on rendering menus. Tauri handles static menus quite well and fully handled the initial Macaroon prototype's requirements. But the dynamic nature of Roon's multi-zone audio means we want to consistently update the menu contents when a zone's status changes — and that's where I ran into issues.

It turns out that [`muda`](https://github.com/tauri-apps/muda), the menu library that Tauri uses, will fully rebuild the menu when its contents change, which causes the menu to close and forces the user to click the menu bar icon again. I spent a *lot* of time trying to debug this, but I'm fairly certain this is a limitation of the library.

Swift, on the other hand, uses native `NSMenu` with `NSMenuItems`. These support incremental updates to a menu rather than full rebuilds. This theoretically avoids the issues I ran into with `muda` — I'll find out should there ever be a Swift rewrite.

#### Displaying Album Art + Text

The core feature of a "Now Playing" app is, of course, to show what track is currently playing. At a minimum, this requires rendering the text of the current track's name and artist, but ideally it also includes showing the album artwork associated with the track.

My time building software has taught me that dealing with text is almost always easier than images, but in this case, the reverse is true. Tauri's `tray.set_icon()` accepts a single flat bitmap image, so passing the album art that Roon's API makes easily accessible is pretty straightforward. 

But showing the current track name, artist name, and album art took some fancy footwork:

1. Decode the album artwork image
2. Render the text in the correct font (SF Pro) at the correct size
3. Calculate the length of the resulting text
4. Truncate (if required) to avoid taking over the entire menu bar
5. Calculate the final layout: `{albumArt} {trackName} — {artist}`
6. Detect dark/light mode to determine text color
7. Render everything into a pixel buffer, at 3× resolution for Retina, and encode it as a PNG to pass to `tray.set_icon()`

*(You can see this in action in `compositor.rs`.)*

At this point you have no doubt noticed the pattern: there is, in fact, a much easier way to do this in Swift. `NSStatusItem` natively supports an `NSImage` and an `NSAttributedString` that can be rendered size by side. More than that, apparently `AppKit` can handle the rest for me, too: layout, truncation, Retina scaling, dark mode text color, and system font rendering. 

## A Swift Kick in the Pants

A reasonable person would ask: why bother re-implementing all of that native Swift and AppKit functionality in Rust? Did you do all of this just to avoid dealing with Apple's native development tooling? 

Well, yes — but most of the tradeoffs were known unknowns at the time. That's a risk I accepted when trying to build something pretty far outside my existing skill set. 

At least I got a 2,000+ word post out of it, I guess?

I had a passing familiarity with Rust and none with Swift at the start of this project. I *did* research the limitations of Tauri in an effort to understand the tradeoffs I'd be making. But, as is often the case, there were tradeoffs I didn't know about and some of those that I *did* consider ahead of time turned out to be gnarlier than expected. 

My goal with this project, though, wasn't to build the perfect app. It was to leverage a coding agent to build a piece of niche personal software. In that, I succeeded — and I learned a lot about native macOS development in the process. 

That said, I will probably re-write this app in Swift in the future. The cost of rewrites is pretty low in the coding agent era, and I've already figured out most of the integration points with Roon's API. The eventual rewrite will have its own set of tradeoffs, though — we'll still need to bootstrap a Node server to handle the API calls and receive WebSocket data.

Who doesn't love building software?