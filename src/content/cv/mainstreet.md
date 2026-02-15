---
company: MainStreet
location: "New York, NY/Remote"
sortOrder: 1
roles:
  - title: Staff Software Engineer
    startYear: 2023
    hasDescription: true
  - title: Senior Software Engineer
    startYear: 2021
    endYear: 2023
    hasDescription: false
---

- Develop and maintain the leading tax credit platform that has **delivered $200+ million of tax credits** to customers and **raised $75 million** in venture capital.
- Lead the technical design and implementation of new products, e.g. support for new tax credits that **increased revenue per customer by 10%.**
  - Redesigned the data model backing our tax credits to be far more flexible and support multiple tax forms, as well multiple versions of the same form
  - Rearchitected our calculations to be composable, which made calculations easily reusable/testable and significantly improved accuracy/maintainability
  - Built a new unified user experience allowing customers to manage all of their data in one place and claim all of the available tax credits together
  - Together, this **reduced a new credit's time to market from months to weeks**
- Rearchitect critical systems like our data import pipeline, which extracts and transforms third-party financial data into domain-specific models.
  - Identified and documented issues with the previous system, then rebuilt the pipeline with a new library to align it with our existing infrastructure choices
  - Implemented a new queuing strategy to separate jobs into single-responsibility queues, support for job priority, rate limiting, and autoscaling
  - This work led to a **500% increase in processing efficiency**, the elimination of crashes, and a massive reduction in errors/incorrect data
- Design and implement ML/AI systems, such as:
  - Document parsing and data extraction for tax documents, leveraging fine-tuned models and human-in-the-loop feedback for further refinement
  - Multi-platform tax chat systems powered by RAG (with dynamic chunking strategies), knowledge graphs, few-shot prompting, and user-specific data
  - A custom LLM evaluation tool to manage the documents for RAG pipeline, a wide range of domain-specific evals, and human-in-the-loop feedback loops, which **improved LLM response accuracy rates from under 20% to over 90%**
  - Nearest-neighbor models to estimate tax credit values and classification models for expense/payroll data trained with internal data sets
- Maintain and support custom infrastructure, deployment, and data systems.
- Contribute to organizational leadership by:
  - Leading engineering teams, from product teams that build the core product to tiger teams that explore and prototype greenfield products
  - Representing engineering in cross-functional planning and strategy contexts
  - Helping to develop high-level engineering strategy, as well as designing and refining day-to-day engineering processes
  - Hiring, mentoring, and leading teams of remote engineers across all experience levels
