---
title: It's Personal
draft: false
excerpt: Why spend time on a personal site in the age of walled gardens?
published: 2025-11-11T10:24:00.000Z
slug: it-s-personal
---

I came of age on the internet when surfing the web still felt like an adventure, when it was so full of new things that you never knew where you'd end up. Back then, it wasn't uncommon for someone to set up a web server and allow anyone on the internet to peruse parts of it as a remote file system — just from within a web browser. Those sections of a website rarely had an index.html file, so the server would render the current directory as web pages using a “default directory view,” usually a white background with a table of blue links.

A part of me misses the aesthetics of that era of the internet, before things like Bootstrap or Tailwind popularized certain styles and hyper-optimized landing pages all started converging on the same, generic look. The look of default directory views is the exact opposite kind of convergence — the internet and websites were so new that those white pages and blue links had a feeling closer to being on the frontier, exploring the depths of some stranger's web server. (Google initially retained some of that feeling, and in fact used the same aesthetic, when it rose to prominence...but it lost that sense long ago.)

When I bought my personal domain, I wanted to both avoid building a generic portfolio and have a little fun with the task in front of me. So I did what any sane person would do: I leaned hard into a joke-y, nostalgic aesthetic that few people remember. Is it a good idea for your personal site to be, quite literally, a joke? Specifically, a joke that you have to explain? Is it even a good joke if I have to explain it?

Probably not, but I enjoyed building it anyway.

# Restrictions Breed Creativity

Programming is, at its core, a creative act. That often gets lost in the day-to-day work of software engineering, but it really comes to the fore when you are working on personal projects.

One of my favorite adages in that vein comes from Mark Rosewater, the Head Designer of Magic: The Gathering. For well over a decade, he has lived by the philosophy that “[restrictions](https://x.com/maro254/status/176046057883578368?lang=en) [breed](https://markrosewater.tumblr.com/post/22705729575/did-you-coin-the-phrase-restriction-breeds) [creativity](https://magic.wizards.com/en/news/making-magic/twenty-years-twenty-lessons-part-3-2016-06-13).”

“This lesson is tied into a myth about creativity,“ Rosewater [writes](https://magic.wizards.com/en/news/making-magic/twenty-years-twenty-lessons-part-3-2016-06-13). “Many people believe that the more options available, the more creative a person can be.”

“This is a myth,” he continues, "because it contradicts what we know about how the brain works." If you're faced with a problem and you've solved that specific problem before, he says, you will likely solve it again in the same way — the opposite of creativity.

Instead, Rosewater argues that “\[i]f you want your brain to get to new places, start from somewhere you've never started before.” Using a restriction, arbitrary or not, to force your brain to start from a new place off the beaten path will help kickstart the creative process.

If I'm being honest, this concept is only a small part of why I built my personal site as a neo-default directory view and mostly a post hoc justification for the time I spent building something that isn't obviously “good.” But, alongside my decision to use default directory aesthetics, I decided to try to mirror default directory functionality as well. And that is definitely a restriction.

So I limited myself to a table-like layout with narrow rows and columns. Nothing fancy — no hero images, slideshows, image animations, etc — and a mono font styled with a very basic color palette.

# Kitchen Table Issues

I learned to build my first websites back when web server directories that had an index.html were forced to use tables as the main way to achieve a non-standard layout. It's an absurd thought in today's age of CSS grid and flexbox, which have fully supplanted tables — even when building actual tables for a web page — but tables used to rule the web. But I never really felt like the transition to floats and clearfixes for layouts was that much of an improvement, at least until Bootstrap 3 made them predictable enough to commit to.

The visual layout of the default directory view is essentially a table, so falling back to the familiar old ways of table-as-page-layout-device was all to easy. I would obviously come to regret using a table...but we'll get to that later.

The basic structure of the site was simple enough to translate to the default directory view, as that view was literally used to visualize the file system of a web server. The top-level pages would get their own links on the landing page, but figuring out the other parts of the site was where the fun was to be had: made-up server signatures in the footer, expanding table rows for details, etc.

# The Latest Update

I think it turned out pretty well — except for the use of tables. As I return to the site more than 10 years after I wrote the first iteration, it is clear that the unpredictable nature of the table element no longer cuts it. Plus, AI tools have come a long way, and products like [v0](https://v0.dev/), [Claude 3.5 Sonnet](https://claude.ai/), and [Cursor](https://cursor.com/) make working on my side projects much more effective. So I've re-written the site with the help of those three tools and am quite pleased with where it ended up.

I wanted to play around with Next.js again, so I converted the site from HTML and vanilla JavaScript to a static Next.js app served via GitHub Pages. v0 helped me translate the classic default directory view style into a more modern React and Tailwind setup, while Claude and Cursor helped me rewrite the site to remove the use of tables in favor of CSS grid.

The site definitely isn't everyone's taste, but I sure have loved working on it over the years. I should probably build a more generic-looking site for those hiring managers (or any other poor souls who stumble upon this site) who either don't get the aesthetic joke or just don't enjoy it. But not today!
