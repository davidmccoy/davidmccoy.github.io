---
name: CoFounder
stack: "TypeScript (React/Next.js), Python (FastAPI)"
infrastructure: "Vercel, GCP (Cloud Run)"
description: "Small business tax, finance, and accounting AI."
category: professional
sortOrder: 1
logo: /images/cofounder-logo.svg
logoWidth: 100
heroImage: /images/cofounder-hero.jpeg
websiteUrl: "https://www.trycofounder.ai"
codeIsPublic: false
isAccessible: true
---

**CoFounder** is an AI platform for startups and small businesses. It brings together all of your businesses data to save you time, money, and help you run your business.

The web application is written in TypeScript/React using the Next.js framework and Vercel for hosting. We chose that stack specifically because we were optimizing for speed to market and ease of iteration.

**I spent most of my time on the AI side of the product,** which is written in Python using the FastAPI framework and LangChain to interface with various foundational models and internal data sources. **I redesigned our existing RAG pipeline to be modular and support a second product and re-wrote our system for adding user data to the LLM's context window.**

The product was also intended as an exploration of the AI space, so I also conducted a few experiments around query augmentation, agents, document hierarchies, and more.
