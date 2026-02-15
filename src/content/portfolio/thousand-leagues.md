---
name: Thousand Leagues
stack: "Ruby (Rails), JavaScript (React)"
infrastructure: Heroku
description: "First-of-its-kind e-sports fantasy app that supported Magic: The Gathering events and player stats."
category: personal
sortOrder: 6
logo: /images/thousand-leagues-logo.png
logoWidth: 140
heroImage: /images/thousand-leagues-hero.jpeg
codeIsPublic: true
githubUrl: "https://github.com/davidmccoy/fantasy-drafter/"
isAccessible: false
---

**Thousand Leagues** was a first-of-its-kind esports fantasy site focusing on *Magic: The Gathering* events. It was built with Ruby on Rails and React.

## Background

I have played fantasy football with friends and family for over a decade. I love the game and have noticed that it has a very distinct ability to increase a fan's engagement with an individual football game by almost always giving them a rooting interest in every game.

(The NFL certainly noticed, too, and put the full force of its marketing behind pushing fantasy football...at least until sports gambling was legalized and everything became a gambling commercial.)

I wanted to test the hypothesis that a fantasy game would have a similar impact on esports, my favorite of which is *Magic: The Gathering*. Plus, I wanted to learn how to build a real-time application, so I chose this project as a way of accomplishing both.

## Functionality

Thousand Leagues supported multiple ways for people to play fantasy *Magic*. Initially, the primary game mode was focused on private leagues, where you could get together with your friends for a specific *Magic* tournament and snake draft your favorite players. That format was the inspiration for the project and was **powered by web sockets and React to create a real-time drafting experience.**

Later, I introduced the pick 'em format for use in public leagues that anyone could join. This was by far the most popular way to play on Thousand Leagues — I ran nearly 100 tournaments and gave away tons of non-monetary prizes.

On Thousand Leagues, a **league could choose between two different kinds of "players" to draft: actual professional *Magic* players or specific *Magic* cards.** The player data was sourced from a combination of event registration and results from the tournament website, as well as historical data and rankings from [The MTG ELO Project](https://www.mtgeloproject.net). The card data, on the other hand, was sourced from a combination of historical tournament metagame reports from [MTG Top 8](https://www.mtgtop8.com/) and the specific decks registered for that particular tournament (if publicized by the tournament organizer). **I built a flexible ETL pipeline to pull in that player and card data, process it, and then load it into the database so it could be presented to users during the draft.**

The results of the actual games of *Magic* were then automatically updated at the end of each round so that fantasy players could have as close to a real-time experience as a *Magic* tournament would allow.

I also had the opportunity to partner with a third party to run a custom *Magic*-themed March Madness event on the platform that drew thousands of players. Instead of drafting, players would create a bracket out of 32 characters from the most recent *Magic* set (called *War of the Spark*, so the event was called "Spark Madness"). **This required building a new UI with d3.js to display brackets and allow users to predict the winners of each round.** My partner then ran polls to determine the round winners and we gave prizes to the players with the most accurate brackets.

Unfortunately, *Magic* events went on a long hiatus during the COVID-19 pandemic and never returned to their pre-pandemic frequency or level of fan interest. As a result, I stopped developing the site in 2020.
