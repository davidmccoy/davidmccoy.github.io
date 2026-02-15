---
name: MainStreet
stack: "TypeScript (React/Node.js), Python (FastAPI)"
infrastructure: "GCP (GKE and Cloud Run)"
description: "Business tax credit platform that has delivered $200+ million in credits."
category: professional
sortOrder: 2
logo: /images/mainstreet-logo.svg
logoWidth: 140
heroImage: /images/mainstreet-hero.jpeg
websiteUrl: "https://www.mainstreet.com"
codeIsPublic: false
isAccessible: true
---

**MainStreet** is the leading tax credit platform, offering credits like R&D, retirement, healthcare, and more. It has delivered over $200 million of savings to customers by qualifying customers for credits and automating the generation of the form required to claim the credit.

The core application is a group of Node.js services and React front ends deployed to Google Kubernetes Engine. There is also a series of AI-powered features built in Python using the FastAPI framework and LangChain to interface with various foundational models and internal data sources.

**I worked on every facet of this product across the entire stack, from the front end to the back end services, and even kubernetes cluster managed by Terraform.**

The first major project I undertook was a rewrite of the ETL pipeline that imported customer accounting and payroll data. The pipeline was plagued with errors, crashes, and unexpected behavior — on top of generally poor performance. I led the analysis, wrote the project proposal and design doc, then implemented a new ETL pipeline and queuing strategy that led to **a 500% increase in processing efficiency, the elimination of crashes, and a massive reduction in errors/incorrect data.**

After we transitioned to the new pipeline, I then helped to design and implement algorithms to improve data reliability and reduce duplicate data.

I am particularly proud of the part I played in redesigning our core data model for tax credits and tax forms. **Over the course of many months, I built support for the data model work and successfully resourced a team to design and implement it.** This work allowed the company to expand its product offering beyond a single tax credit (R&D) to retirement, healthcare, and more.

While collaborating with the team doing the data model work, I separately led the work to implement the newly-supported tax credits in our core product. This required two entirely new user experiences: a dashboard to guide users through the credit claiming process and a survey to collect the necessary information, the latter of which required a new algorithm to collect, filter, clean, and insert user data in order to reduce manual data entry. **This work made it significantly easier for customers to claim their credits by streamlining the form generation process and resulted in 10% more revenue per customer.**

**I also led the effort to integrate AI into the product,** which included productionalizing a proof-of-concept chatbot, developing custom evals, building an internal benchmarking tool, significantly improving our RAG pipeline performance, and building an efficient system for including user data in LLM context windows. We were afforded the opportunity to explore the AI space, as well, so we also conducted a few experiments around query augmentation, agents, document hierarchies, and more.
