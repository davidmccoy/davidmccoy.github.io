---
title: Show More, "The TweetDeck Replacement"
excerpt: #RIP TweetDeck (again), the avatar of Twitter's golden age.
tags:
  - side-projects
  - software
slug: show-more-the-tweetdeck-replacement
published: 2026-03-26
---

On March 26, 2026, ~~Twitter~~ X moved ~~TweetDeck~~ X Pro behind the Premium+ paywall—just the latest indignity forced upon the only thing that made Twitter more than marginally usable. 

I'm not interested in paying more than $30 a month for access to TweetDeck for various reasons, the most relevant of which is my waning usage of Twitter, so I've been forced back to Twitter's extremely limited web UI. 

When I do use Twitter, I tend to use it as a live feed and scan new tweets as they come in. (Remember live tweeting? Remember life before the spread of malignant For You pages?) Unfortunately, this use case is functionally impossible in Twitter's web UI because any new tweets pushed to the client are hidden behind a "Show N Posts" button at the top of the feed. 

![](/assets/show-n-posts.png)

Fortunately, it's very easy for a Chrome extension to click a button and Claude is very fast. So we threw together a simple extension that detects DOM changes via `MutationObserver`, checks to see if it is the "Show N Posts" button, and clicks it.

Problem solved! Though this will probably only slow the rate of decline of my Twitter usage.