---
name: Team Magic League
stack: "Ruby (Rails), JavaScript"
infrastructure: Heroku
description: "Gaming content and news site that reached over 2 million users annually at peak and 60% growth year-over-year from 2017-2023. Employed a remote team of 10 and generated $100k+ in revenue."
category: personal
sortOrder: 7
logo: /images/tdl-logo.jpeg
logoWidth: 130
heroImage: /images/tdl-hero.jpeg
websiteUrl: "https://www.teammagicleague.com"
codeIsPublic: true
githubUrl: "https://github.com/davidmccoy/teamdraftleague/"
isAccessible: true
---

**Team Magic League** (neé Team Draft League) was born in 2013 when a group of Brooklyn-based *Magic: The Gathering* players wanted a way to organize and track team drafts. We formed a league — and what does every league need? Schedules, results pages, and leaderboards. So I stepped in and built my first actually-used-by-real-people side project.

Looking back on the code base is an exercise in cringing over and over. It's a basic CRUD Rails app with a lot of poorly thought out data modeling, incorrect use (or pure ignorance of) Rails conventions, or really any best practices, and just a lot of beginners mistakes. But I'm incredibly proud that a group of 20-30 people used this site for years to keep our little league going.

The core functionality of the app was the creation of a league, seasons, teams, and players. Those teams (usually made up of three people) would schedule matches against each other, where players would play everyone on the other team in 1v1 matches of *Magic*. The results would be reported on the website, aggregated to create seasonal leaderboards, personal statistics, etc.

I stopped actively developing the site in 2015 as the original incarnation of TDL ceased operations.
