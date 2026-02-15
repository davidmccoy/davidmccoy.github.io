---
name: Upright
stack: "Ruby (Rails), JavaScript (React)"
infrastructure: "AWS (EKS)"
description: "Real estate lending and investing platform."
category: professional
sortOrder: 3
logo: /images/upright-logo.png
logoWidth: 80
heroImage: /images/upright-hero.jpeg
websiteUrl: "https://www.upright.us"
codeIsPublic: false
isAccessible: true
---

**Upright** (neé FundThatFlip) is a real estate financing and investment platform. It provides loans to established home builders and offers institutional and accredited investors the opportunity to invest in those loans.

The main product was built with Ruby on Rails and React when I worked on it, but has changed significantly over the intervening period.

One of my biggest accomplishments while working on Upright was **helping to design and implement a payment system built directly on top of banking APIs that moved $10+ million per day at peak.** The business has extremely unique needs when it comes to money movement — it loans millions of dollars to builders through a complicated series of legal entities, accepts millions of dollars of investment from institutional and accredited investors, and then pays interest and principal to those investors on their investments.

To support these needs, **the payment system needed to be extremely resilient and interface directly with banking APIs** to programmatically open up new accounts, fund those accounts, and perform balance sweeps to ensure the accounts remained in good standing. The system would determine which accounts were to be used to pay how much to which investor or loan recipient, move that money programmatically, ensure the funds settled correctly, and perform any necessary dunning.

**Underlying every payment was a calculation done by a calculation engine that I helped design, implement, and thoroughly test.** Previously, a given calculation's logic was written close to where the math was needed — so if it was needed on the front end, the calculation lived there; if it was need for both underwriting and payments, then it was duplicated in both places. This was an inflexible and unreliable system that was impossible to maintain and very vulnerable to errors, so we decided to design a set of composable calculation objects in the back end that could also be accessed by the front end via an API.

That design decision significantly improved the calculations we did at every level of the application. It allowed us to refactor our loan underwriting tool to use the new calculation engine, **which significantly increasing the tool's reliability and improving the business's ability to accurately assess a loan applicant.**

Due the nature of running a financial application, we also spent a large amount time identifying and addressing fraud. **I designed and built our initial fraud detection system, along with the custom algorithm we used to judge each individual user and individual transaction** to prevent things like spam account sign ups and to significantly reduce the likelihood any money was lost to fraud.
