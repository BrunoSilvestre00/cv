# Bruno Ap. Silvestre

**Fullstack Software Engineer**

[bruno.ap.silvestre@gmail.com](mailto:bruno.ap.silvestre@gmail.com) · [+55 (14) 98824-6613](tel:+5514988246613) · Araraquara / SP — Brazil · [LinkedIn](https://www.linkedin.com/in/bruno-silvestre-aa970820b/) · [GitHub](https://github.com/BrunoSilvestre00) · [Currículo Lattes](http://lattes.cnpq.br/9798985966699271)

Age: 24 · Portuguese: Proficient · English: [CEFR B2](https://certs.duolingo.com/3c7vqmarcwmqzqkb)

---

## Summary

Fullstack Software Engineer with 4+ years of experience, nearly all of it at the same tech-education platform — which has taken me through almost every layer of it: content catalog, payment checkout, backoffice, and the infrastructure underneath. I work with Python (Django, FastAPI) on the backend, TypeScript with React, Redux, and Tailwind on the frontend, PostgreSQL and MySQL for data, and Docker to package it — and I provision what keeps it running: ECS clusters, queues, Lambdas, and CI/CD in Terraform. I own the architecture decisions on the large projects, and the areas that tolerate no silent failure — billing, credit ledgers, and authentication.

M.Sc. in Computer Science from ICMC-USP, researching adaptive assessment. The dissertation did not stop at the text: it became CAT API, an open-source system that reached production and was validated with real classrooms. That is where my interest in applied AI comes from — today I build generative AI pipelines in production, integrating LLMs and vector databases into the product.

🎓 M.Sc. in Computer Science · 🏅 InterIF Medal Winner · 🏃 SBC Marathon Finalist · CEFR B2

---

## Skills

**Skills — Proficient:** Python, Django, FastAPI, TypeScript, JavaScript, ReactJS, Redux, Vite, HTML, CSS, Tailwind CSS, styled-components, EJS, SQL, PostgreSQL, MySQL / Aurora, MariaDB, Redis, Celery, Docker, Git / GitHub

**Cloud & DevOps:** AWS ECS, AWS Lambda, AWS S3, CloudFront, EventBridge, SQS, SES, AWS EC2, Terraform, GitHub Actions, Keycloak (SSO)

**AI & Data:** LangChain, Langflow, OpenAI API, Qdrant, Chroma, Neo4j, R (mirtCAT), Claude Code / Codex, MCP

**Skills — Familiar:** Java, Spring, Angular, Android (Java), C, C++, C#, Go, Firebase

---

## Experience

### [DIO](https://dio.me/) · [web.dio.me](https://web.dio.me/) — Apr 2022 – Present

*Mid-level Fullstack Software Engineer*

**Progression:** Intern (Apr 2022) → Junior (Jan 2023) → Mid-level (Jul 2024)

**Stack:** Python (Django, FastAPI) · ReactJS + Vite + Redux + Tailwind + styled-components · PostgreSQL and MySQL (Aurora) · Docker · AWS · Terraform · Git/GitHub

Involved in every major platform project, from product to infrastructure.

**Key projects**

- **DIO Play** — the platform's content catalog: courses, learning tracks, acceleration programs, live sessions, and mentorships
- **English 4 Tech** — English learning track for DIO Global users, focused on the job market
- **AI Job Hunter** — personalized AI agent that finds openings matching the candidate's résumé and tunes their profile to widen reach and improve hiring odds
- **Talent Match** — B2B platform for talent acquisition
- **Redesign of the learning components** — teaching flow and content delivery
- **Admin dashboards** — backoffice systems and internal projects
- **Automated landing pages** — a template the business team replicates for courses, learning tracks, and sales pages (Pro and Global), swapping copy and images without needing development
- **Payment checkout** — the platform's purchase flow
- Smaller projects — profile and home redesign, sales campaign configuration, among others

**Engineering highlights**

- **Technical leadership** — led architecture and structural decisions on major platform projects.
- **End-to-end backoffice** — backoffice system built from scratch: FastAPI on the backend, React + Vite + Tailwind on the frontend, including provisioning the infrastructure for both.
- **Infrastructure as code** — APIs on an ECS cluster and frontends on S3 + CloudFront, provisioned with Terraform and automated CI/CD via GitHub Actions and Docker.
- **Serverless** — Lambda deployments with Terraform and CI/CD, invoked via SQS.
- **Events and messaging** — event orchestration with EventBridge and SQS, plus asynchronous and scheduled processing with Celery Beat.
- **Caching** — cache management with Redis.
- **Payments** — checkout and integration with multiple payment providers: Malga, Pagar.me, Mercado Pago, and Barte.
- **Credit ledger** — implemented a ledger for credit control, reused across more than one feature.
- **SSO** — Keycloak deployment and configuration, integrated into both backend and frontend projects.
- **Generative AI** — pipeline with Langflow, LangChain, Qdrant, and the OpenAI API for automated content review generation.
- **Transactional email** — automated delivery via SES with templates, triggered by user events or scheduled.

### Grupo MMV — Jan 2017 – Mar 2019

*Hardware Technician*

- **Desktop and laptop maintenance** — repairs, assembly, cleaning, formatting, and setup on Windows and Linux
- **Printers** — setup of toner and color printers
- **CCTV** — installation and configuration of cameras and DVRs
- **Network infrastructure** — rack assembly with server and switch

---

## Education

### [ICMC/USP](https://www.icmc.usp.br/) — Mar 2023 – Jul 2026

*M.Sc. in Computer Science — completed*

Research: AI and Education — Computerized Adaptive Testing (CAT), Item Response Theory (IRT), and Cognitive Diagnostic Models (CDM)

**Dissertation:** CAT API: Exploring the Application of IRT and CDM Models in Formative Assessment Through Computerized Adaptive Testing

[Dissertation](https://drive.google.com/file/d/11hoGpRHbuZn6gRuxmgRfUnmf3s3usmA9/view?usp=sharing) · [Completion certificate](https://drive.google.com/file/d/15wBzHUohVO2E2BIKvcbguki4X2fsp6KF/view?usp=drivesdk)

### [IFSP — Araraquara Campus](https://www.arq.ifsp.edu.br/) — Feb 2020 – Dec 2022

*Systems Analysis and Development*

[Completion certificate](https://drive.google.com/file/d/1KcwHOWfD2IhL3Iq1GT5wdRcvjk8OR4Hq/view)

---

## Projects

### [CAT API](https://github.com/cat-api-icmc/master-cat-api) — 2023 – 2026

*Master's Research — ICMC-USP*

**Stack:** Python + Django · adaptive service in R (mirtCAT + plumber) · custom CD-CAT · MariaDB · React + Redux + styled-components · Docker · automated CI/CD · Ubuntu web server

Abstract: CAT API is a computational solution aimed at the application of Computerized Adaptive Testing (CAT) in the context of formative assessment. The proposed solution consists of an open-source educational API that integrates Item Response Theory (IRT) models and Cognitive Diagnostic Models (CDM), which are well-established methodologies in the field of Psychometrics. The main objective is to reduce the technical and conceptual barriers associated with the adoption of adaptive assessments by means of a modular architecture with low integration effort and a reduced learning curve, enabling different educational platforms and client systems to seamlessly incorporate adaptive testing.

The API is designed to support both proficiency estimation and the identification of specific skills and attributes mastered by students, providing more precise and informative assessments when compared to classical testing approaches. The evaluation of the solution comprised controlled tests based on simulations, as well as practical tests conducted in real classroom settings, allowing the analysis of its behavior in real-world educational scenarios. The results indicate that the proposed approach is feasible, flexible, and capable of delivering meaningful information to evaluators, contributing to the broader adoption of adaptive assessments in diverse educational contexts.

### Learning Analytics in DIO's E-learning Platform — 2021 – 2022

*Undergraduate Research — IFSP*

**Title:** Application of Learning Analytics to Identify Aspects of Non-Completion of a Course by a Student on the Digital Innovation One Platform

Undergraduate research applied to Digital Innovation One's (DIO) e-learning platform, a community of more than 2.4 million students. The goal was to apply Learning Analytics to understand student behavior and identify the aspects that lead to non-completion of courses and bootcamps, contributing to validating the teaching methodology and evaluating the performance of the content offered.

---

## Academic Competitions

### [Maratona de Programação — SBC](https://maratona.sbc.org.br/) — 2020

*Finalist at the national stage*

The Brazilian stage of the ICPC, organized by the Brazilian Computer Society: teams of three students solve algorithmic problems in five hours.

### InterIF — 2020 · 2022

*3rd place in 2020 · Finalist in 2022*

Programming contest held between campuses of the Federal Institutes network.

**Stack:** C/C++ and Python — [beecrowd profile](https://judge.beecrowd.com/pt/profile/491514) · [LeetCode profile](https://leetcode.com/u/BrunoSilvestre00/)

### Kangaroo Mathematics Olympiad — 2016

*Bronze Medal*

Mathematics olympiad applied in schools across Brazil by Canguru de Matemática Brasil.

### POSCOMP — 2022

*Score: 34*

Brazil's National Exam for Admission to Graduate Programs in Computing: a nationwide assessment of Computer Science knowledge used as an admission criterion for master's and doctoral programs.
