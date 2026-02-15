---
name: MTGCast
stack: "Ruby (Rails), JavaScript"
infrastructure: "Heroku, AWS (s3)"
description: "Content creation platform that supported blogs and podcasts."
category: personal
sortOrder: 5
logo: /images/mtgcast-logo.png
logoWidth: 90
heroImage: /images/mtgcast-hero.jpeg
codeIsPublic: true
githubUrl: "https://github.com/davidmccoy/podcaster"
isAccessible: false
---

## Background

**MTGCast** launched in 2014 in order to provide a free, shared podcast hosting platform for the *Magic: The Gathering* community. In 2018, the site experienced a catastrophic failure and lost the majority of its data. The operators at the time weren't up to trying to recover the site, **so I stepped in and began the painstaking recovery and reconstruction of the service.**

## "Gentlemen, We Can Rebuild Him."

Unfortunately, the database was irretrievable. I was able recover a large portion of the audio files that MTGCast users had uploaded, but that was the only data with which I could restore the site's historical data. The result was very incomplete but I managed to re-host all of the recovered audio files under properly-organized RSS feeds.

MTGCast had already been down for a few weeks by the time I got involved. Given the level of data loss, I decided that rebuilding the basic functionality of MTGCast from scratch would be faster than recreating the previous WordPress-based version that had already begun to come apart at the seams. Speed was still important, though, **so I chose Rails to quickly scaffold out the podcast creation, episode upload, and RSS feed features.**

## Functionality

After restoring service, **the immediate flood of traffic forced me to refine my caching techniques** ahead of schedule, particularly for the RSS feeds I was programmatically generating for each podcast. I then proceeded to flesh out the podcast management side of things by adding **a second database to store records individual downloads, which were then processed asynchronously into aggregated analytics data.** I also added **a file compression service to reduce my AWS data costs** and expanded the content types to include text posts, which required upgrading the text editor to use [tiptap](https://tiptap.dev/).

The service continued to evolve over the next few years but never really recovered from the initial failure. I stopped actively developing the site in 2022.
