---
title: Introducing Macaroon, a macOS Menu Bar App For Roon
excerpt: Vibe-coded with lots of love and a bit of care.
tags:
  - side-projects
  - software
slug: introducing-macaroon-a-macos-menu-bar-app-for-roon
published: 2026-05-02
---

I am always accompanied by music when I'm in my office. I usually split my listening time between my well-established library of vinyl records and new music through the multiple streaming services I subscribe to.

When listening to music, new or old, I like to keep an eye on the artist and track names. The Mac's “Now Playing” feature has never really worked for me because it is buried in the  Control Center menu, so I have used various menu bar applications over the years to show a live look at the current track (e.g. [MusicBar](https://github.com/DimitarNestorov/MusicBar) and [SpotMenu](https://github.com/kmikiy/SpotMenu)). But none of them have ever supported my favorite music application: [Roon](https://roon.app/en/).

So I built one. Meet [Macaroon](https://github.com/davidmccoy/macaroon)! 

<figure><img src="/assets/macaroon-example.png" alt="An example of Macaroon displaying a track name, artist name, and album art" /><figcaption>An example of Macaroon displaying a track name, artist name, and album art</figcaption></figure>

## What Macaroon Does

- Integrates directly with Roon via your Roon Core
- Shows the current track's:
	- Artwork
	- Track name
	- Artist name
- Supports multi-zone
	- See the status of each zone
	- Choose which zone shows in the menu bar
- Supports multiple clients on the same network
	- Each instance of Macaroon is a separate Roon extension
	- Therefore, you can install Macaroon on all of your computers

I wrote [a technical deep dive](/posts/building-macaroon), as well, for those interested.

## It's Nice to be Niche

I would have never been able to solve this problem a few years ago. It is so niche that it is highly unlikely anyone else would have built a solution, and I wouldn't have had the time or native development skill to build something like Macaroon — until the arrival of coding agents. 

That's the beauty of coding agents: they have unlocked a golden age of personal software. You *can*, in fact, just do it!

Open source software is one of the last remaining vestiges of early computing's utopian philosophy. One person could solve a problem and then share that solution with anyone else who needed it, for free. But open source has always had a pretty high barrier to entry because it required the combination skill, knowledge, and time that few possess.

Coding agents have fundamentally changed that. I would have had a much harder time approaching this problem due to my lack of native development experience and the many asks on my time. But thanks to my new friend, Claude, I can solve a small problem for myself and share it with anyone else that might be experience the same issue.

