/**
 * i18n.js — Translation data for PT-BR and EN
 * Loaded as a global (window.translations) to work on file:// without CORS issues.
 *
 * controls.langToggle stores the label to switch TO (not the current lang):
 *   PT active  → button shows "EN"
 *   EN active  → button shows "PT"
 *
 * Keys consumed via [data-i18n-html] may contain inline markup (<strong>,
 * <span class="stack-label">). Those strings are authored here in the repo and
 * never come from user input — see the note in main.js before adding more.
 *
 * {placeholder} tokens are substituted at render time by interpolate() in
 * main.js. Available: {experienceYears} — whole years since CAREER_START.
 * Never hardcode a number that goes stale on its own; add a token instead.
 *
 * The pt and en trees MUST stay key-for-key identical; main.js falls back to
 * printing the key path itself when one is missing, which is very visible.
 */
window.translations = {
  /* ──────────────────────────────────────────
     PORTUGUÊS (PT-BR)
     ────────────────────────────────────────── */
  pt: {
    meta: {
      title: "Bruno Silvestre — Currículo",
    },
    controls: {
      download: "Baixar PDF",
      langToggle: "EN",
      themeToggle: "Alternar tema claro/escuro",
      manualPrintHint:
        'Prefere personalizar antes de gerar o PDF? Use <strong>Ctrl+P</strong> e escolha <strong>"Salvar como PDF"</strong> no destino — "Microsoft Print to PDF" gera uma imagem, sem texto selecionável nem links.',
    },
    sidebar: {
      title: "Engenheiro de Software Fullstack",
      contactHeading: "Contato",
      location: "Araraquara / SP — Brasil",
      infoHeading: "Informações",
      ageLabel: "Idade:",
      portugueseLabel: "Português:",
      portugueseLevel: "Proficiente",
      englishLabel: "Inglês:",
      skillsProficient: "Habilidades — Proficiente",
      skillsCloud: "Cloud & DevOps",
      skillsAI: "IA & Dados",
      skillsFamiliar: "Habilidades — Familiaridade",
    },
    main: {
      summaryHeading: "Resumo",
      summaryP1:
        "Engenheiro de Software Fullstack com mais de {experienceYears} anos de experiência, quase toda construída na mesma plataforma de educação em tecnologia — o que me levou a passar por praticamente todas as suas camadas: catálogo de conteúdos, checkout de pagamento, backoffice e a infraestrutura por baixo. Trabalho com Python (Django, FastAPI) no backend, TypeScript com React, Redux e Tailwind no frontend, PostgreSQL e MySQL no banco e Docker para empacotar — e provisiono o que mantém isso no ar: clusters ECS, filas, Lambdas e CI/CD em Terraform. Respondo pelas decisões de arquitetura dos projetos grandes e pelas áreas que não toleram falha silenciosa — cobrança, ledger de créditos e autenticação.",
      summaryP2:
        "Mestre em Ciências de Computação pelo ICMC-USP, com pesquisa em avaliação adaptativa. A dissertação não parou no texto: virou a CAT API, um sistema de código aberto que entrou em produção e foi validado com turmas reais. É daí que vem meu interesse por IA aplicada — hoje construo pipelines de IA generativa em produção, integrando LLMs e bancos vetoriais ao produto.",
      experienceHeading: "Experiência",
      educationHeading: "Formação",
      projectsHeading: "Projetos",
      competitiveHeading: "Competições Acadêmicas",
    },
    badges: {
      master: "Mestre em Ciências de Computação",
      medal: "Medalhista InterIF",
      marathon: "Finalista Maratona SBC",
    },
    experience: {
      dio: {
        period: "Abr 2022 – Presente",
        role: "Engenheiro de Software Fullstack Pleno",
        stack:
          '<span class="stack-label">Stack:</span> Python (Django, FastAPI) · ReactJS + Vite + Redux + Tailwind + styled-components · PostgreSQL e MySQL (Aurora) · Docker · AWS · Terraform · Git/GitHub',
        progression:
          "<strong>Progressão:</strong> Estágio (Abr 2022) → Júnior (Jan 2023) → Pleno (Jul 2024)",
        lead: "Participação em todos os grandes projetos da plataforma, do produto à infraestrutura.",
        projectsLabel: "Principais projetos",
        proj1:
          "<strong>DIO Play</strong> — catálogo de conteúdos da plataforma: cursos, trilhas, acelerações, lives e mentorias",
        proj2:
          "<strong>English 4 Tech</strong> — trilha de formação em inglês para usuários DIO Global, voltada ao mercado de trabalho",
        proj3:
          "<strong>AI Job Hunter</strong> — agente de IA personalizado que busca vagas aderentes ao currículo do candidato e ajusta seu perfil para ampliar o alcance e a chance de contratação",
        proj4:
          "<strong>Talent Match</strong> — plataforma B2B para contratação de talentos",
        proj5:
          "<strong>Reformulação dos componentes de aprendizado</strong> — fluxo de ensino e disponibilização de conteúdo",
        proj6:
          "<strong>Painéis administrativos</strong> — sistemas de backoffice e projetos internos",
        proj7:
          "<strong>Landing pages automatizadas</strong> — template que o time de negócio replica para cursos, trilhas e páginas de venda (Pro e Global), trocando textos e imagens sem depender de desenvolvimento",
        proj8:
          "<strong>Checkout de pagamento</strong> — fluxo de compra da plataforma",
        proj9:
          "Projetos menores — reformulação de perfil e home, configuração de campanhas de vendas, entre outros",
        highlightsLabel: "Destaques de engenharia",
        hl1: "<strong>Liderança técnica</strong> — liderei decisões de arquitetura e estrutura de grandes projetos da plataforma.",
        hl2: "<strong>Backoffice end-to-end</strong> — sistema de backoffice construído do zero: FastAPI no backend, React + Vite + Tailwind no frontend, incluindo o provisionamento da infraestrutura de ambos.",
        hl3: "<strong>Infraestrutura como código</strong> — APIs em cluster ECS e frontends em S3 + CloudFront, provisionados com Terraform e CI/CD automatizado via GitHub Actions e Docker.",
        hl4: "<strong>Serverless</strong> — deploy de Lambdas com Terraform e CI/CD, invocadas via SQS.",
        hl5: "<strong>Eventos e mensageria</strong> — orquestração de eventos com EventBridge e SQS, e processamento assíncrono e agendado com Celery Beat.",
        hl6: "<strong>Cache</strong> — controle de cache com Redis.",
        hl7: "<strong>Pagamentos</strong> — checkout e integração com múltiplos meios de pagamento: Malga, Pagar.me, Mercado Pago e Barte.",
        hl8: "<strong>Ledger de créditos</strong> — implementação de ledger para controle de créditos, reaproveitado em mais de uma feature.",
        hl9: "<strong>SSO</strong> — deploy e configuração do Keycloak, com integração nos projetos de backend e frontend.",
        hl10: "<strong>IA generativa</strong> — pipeline com Langflow, LangChain, Qdrant e OpenAI API para geração de revisão de conteúdos.",
        hl11: "<strong>E-mail transacional</strong> — disparos automáticos via SES com templates, a partir de eventos do usuário ou agendados.",
      },
      mmv: {
        period: "Jan 2017 – Mar 2019",
        role: "Técnico em Hardware",
        bullet1:
          "<strong>Manutenção de desktops e notebooks</strong> — reparos, montagem, limpeza, formatação e setup em Windows e Linux",
        bullet2:
          "<strong>Impressoras</strong> — setup de impressoras toner e coloridas",
        bullet3:
          "<strong>CFTV</strong> — instalação e configuração de câmeras e DVR",
        bullet4:
          "<strong>Infraestrutura de rede</strong> — montagem de racks com servidor e switch",
      },
    },
    education: {
      usp: {
        degree: "Mestrado em Ciências de Computação — concluído",
        period: "Mar 2023 – Jul 2026",
        note: "Pesquisa: IA e Educação — Testes Adaptativos Computadorizados (CAT), Teoria de Resposta ao Item (IRT) e Modelos de Diagnóstico Cognitivo (CDM)",
        dissertation:
          "<strong>Dissertação:</strong> CAT API: Explorando a Aplicação de Modelos de TRI e MDC na Avaliação Formativa por Meio de Testes Adaptativos Computadorizados",
        linkDissertation: "Dissertação",
        linkCertificate: "Certificado de conclusão",
      },
      ifsp: {
        degree: "Análise e Desenvolvimento de Sistemas",
        campus: "Campus Araraquara",
        period: "Fev 2020 – Dez 2022",
        linkCertificate: "Certificado de conclusão",
      },
    },
    competitive: {
      sbc: {
        name: "Maratona de Programação — SBC",
        period: "2020",
        result: "Finalista da fase nacional",
        desc: "Etapa brasileira do ICPC, organizada pela Sociedade Brasileira de Computação: equipes de três estudantes resolvem problemas algorítmicos em cinco horas.",
      },
      interif: {
        name: "InterIF",
        period: "2020 · 2022",
        result: "3º lugar em 2020 · Finalista em 2022",
        desc: "Competição de programação disputada entre campi dos Institutos Federais.",
      },
      stack: '<span class="stack-label">Stack:</span> C/C++ e Python',
      beecrowd: "Perfil beecrowd",
      leetcode: "Perfil LeetCode",
      canguru: {
        name: "Olimpíada Canguru de Matemática",
        period: "2016",
        result: "Medalha de Bronze",
        desc: "Olimpíada de matemática aplicada em escolas de todo o Brasil pelo Canguru de Matemática Brasil.",
      },
      poscomp: {
        name: "POSCOMP",
        period: "2022",
        result: "Pontuação: 34",
        desc: "Exame Nacional de Ingresso na Pós-Graduação em Computação: avaliação nacional de conhecimentos em Computação, utilizada como critério de ingresso em programas de mestrado e doutorado no Brasil.",
      },
    },
    projects: {
      catapi: {
        name: "CAT API",
        period: "2023 – 2026",
        type: "Mestrado / Pesquisa — ICMC-USP",
        stack:
          '<span class="stack-label">Stack:</span> Python + Django · serviço adaptativo em R (mirtCAT + plumber) · CD-CAT próprio · MariaDB · React + Redux + styled-components · Docker · CI/CD automatizado · servidor web Ubuntu',
        desc_1:
          "Resumo: CAT API é uma solução computacional voltada à aplicação de Testes Adaptativos Computadorizados (TAC) no contexto da avaliação formativa. A solução proposta consiste em uma API educacional de código aberto que integra modelos da Teoria de Resposta ao Item (TRI) e Modelos de Diagnóstico Cognitivo (MDC), metodologias amplamente consolidadas na área da Psicometria. O objetivo principal é reduzir as barreiras técnicas e conceituais associadas à adoção de avaliações adaptativas, por meio de uma arquitetura modular, de fácil integração e com baixa curva de aprendizagem, permitindo que diferentes plataformas educacionais e sistemas clientes incorporem testes adaptativos de forma transparente.",
        desc_2:
          "A API foi concebida para suportar tanto a estimação de proficiência quanto a identificação de habilidades e atributos específicos dos estudantes, possibilitando avaliações mais precisas e informativas quando comparadas aos métodos clássicos. A avaliação da solução incluiu testes controlados baseados em simulações, bem como testes práticos realizados em turmas reais, o que permitiu analisar seu comportamento em cenários educacionais concretos. Os resultados indicam que a abordagem proposta é viável, flexível e capaz de fornecer informações relevantes para avaliadores, contribuindo para o uso mais amplo de avaliações adaptativas em contextos educacionais diversos.",
      },
      ic: {
        name: "Learning Analytics no E-learning da DIO",
        period: "2021 – 2022",
        type: "Iniciação Científica — IFSP",
        title:
          "<strong>Título:</strong> Aplicação de Learning Analytics para Identificação dos Aspectos da Não Conclusão de um Curso por um Discente na Plataforma da Digital Innovation One",
        desc:
          "Iniciação científica aplicada à plataforma de e-learning da Digital Innovation One (DIO), comunidade com mais de 2,4 milhões de alunos. O objetivo foi aplicar Learning Analytics para entender o comportamento dos alunos e identificar os aspectos que levam à não conclusão de cursos e bootcamps, contribuindo para a validação da metodologia de ensino e a avaliação de desempenho dos conteúdos oferecidos.",
      },
    },
  },

  /* ──────────────────────────────────────────
     ENGLISH (EN)
     ────────────────────────────────────────── */
  en: {
    meta: {
      title: "Bruno Silvestre — Resume",
    },
    controls: {
      download: "Download PDF",
      langToggle: "PT",
      themeToggle: "Toggle light/dark theme",
      manualPrintHint:
        'Prefer to customize before generating the PDF? Use <strong>Ctrl+P</strong> and choose <strong>"Save as PDF"</strong> as the destination — "Microsoft Print to PDF" produces a flat image, with no selectable text and no links.',
    },
    sidebar: {
      title: "Fullstack Software Engineer",
      contactHeading: "Contact",
      location: "Araraquara / SP — Brazil",
      infoHeading: "Info",
      ageLabel: "Age:",
      portugueseLabel: "Portuguese:",
      portugueseLevel: "Proficient",
      englishLabel: "English:",
      skillsProficient: "Skills — Proficient",
      skillsCloud: "Cloud & DevOps",
      skillsAI: "AI & Data",
      skillsFamiliar: "Skills — Familiar",
    },
    main: {
      summaryHeading: "Summary",
      summaryP1:
        "Fullstack Software Engineer with {experienceYears}+ years of experience, nearly all of it at the same tech-education platform — which has taken me through almost every layer of it: content catalog, payment checkout, backoffice, and the infrastructure underneath. I work with Python (Django, FastAPI) on the backend, TypeScript with React, Redux, and Tailwind on the frontend, PostgreSQL and MySQL for data, and Docker to package it — and I provision what keeps it running: ECS clusters, queues, Lambdas, and CI/CD in Terraform. I own the architecture decisions on the large projects, and the areas that tolerate no silent failure — billing, credit ledgers, and authentication.",
      summaryP2:
        "M.Sc. in Computer Science from ICMC-USP, researching adaptive assessment. The dissertation did not stop at the text: it became CAT API, an open-source system that reached production and was validated with real classrooms. That is where my interest in applied AI comes from — today I build generative AI pipelines in production, integrating LLMs and vector databases into the product.",
      experienceHeading: "Experience",
      educationHeading: "Education",
      projectsHeading: "Projects",
      competitiveHeading: "Academic Competitions",
    },
    badges: {
      master: "M.Sc. in Computer Science",
      medal: "InterIF Medal Winner",
      marathon: "SBC Marathon Finalist",
    },
    experience: {
      dio: {
        period: "Apr 2022 – Present",
        role: "Mid-level Fullstack Software Engineer",
        stack:
          '<span class="stack-label">Stack:</span> Python (Django, FastAPI) · ReactJS + Vite + Redux + Tailwind + styled-components · PostgreSQL and MySQL (Aurora) · Docker · AWS · Terraform · Git/GitHub',
        progression:
          "<strong>Progression:</strong> Intern (Apr 2022) → Junior (Jan 2023) → Mid-level (Jul 2024)",
        lead: "Involved in every major platform project, from product to infrastructure.",
        projectsLabel: "Key projects",
        proj1:
          "<strong>DIO Play</strong> — the platform's content catalog: courses, learning tracks, acceleration programs, live sessions, and mentorships",
        proj2:
          "<strong>English 4 Tech</strong> — English learning track for DIO Global users, focused on the job market",
        proj3:
          "<strong>AI Job Hunter</strong> — personalized AI agent that finds openings matching the candidate's résumé and tunes their profile to widen reach and improve hiring odds",
        proj4:
          "<strong>Talent Match</strong> — B2B platform for talent acquisition",
        proj5:
          "<strong>Redesign of the learning components</strong> — teaching flow and content delivery",
        proj6:
          "<strong>Admin dashboards</strong> — backoffice systems and internal projects",
        proj7:
          "<strong>Automated landing pages</strong> — a template the business team replicates for courses, learning tracks, and sales pages (Pro and Global), swapping copy and images without needing development",
        proj8:
          "<strong>Payment checkout</strong> — the platform's purchase flow",
        proj9:
          "Smaller projects — profile and home redesign, sales campaign configuration, among others",
        highlightsLabel: "Engineering highlights",
        hl1: "<strong>Technical leadership</strong> — led architecture and structural decisions on major platform projects.",
        hl2: "<strong>End-to-end backoffice</strong> — backoffice system built from scratch: FastAPI on the backend, React + Vite + Tailwind on the frontend, including provisioning the infrastructure for both.",
        hl3: "<strong>Infrastructure as code</strong> — APIs on an ECS cluster and frontends on S3 + CloudFront, provisioned with Terraform and automated CI/CD via GitHub Actions and Docker.",
        hl4: "<strong>Serverless</strong> — Lambda deployments with Terraform and CI/CD, invoked via SQS.",
        hl5: "<strong>Events and messaging</strong> — event orchestration with EventBridge and SQS, plus asynchronous and scheduled processing with Celery Beat.",
        hl6: "<strong>Caching</strong> — cache management with Redis.",
        hl7: "<strong>Payments</strong> — checkout and integration with multiple payment providers: Malga, Pagar.me, Mercado Pago, and Barte.",
        hl8: "<strong>Credit ledger</strong> — implemented a ledger for credit control, reused across more than one feature.",
        hl9: "<strong>SSO</strong> — Keycloak deployment and configuration, integrated into both backend and frontend projects.",
        hl10: "<strong>Generative AI</strong> — pipeline with Langflow, LangChain, Qdrant, and the OpenAI API for automated content review generation.",
        hl11: "<strong>Transactional email</strong> — automated delivery via SES with templates, triggered by user events or scheduled.",
      },
      mmv: {
        period: "Jan 2017 – Mar 2019",
        role: "Hardware Technician",
        bullet1:
          "<strong>Desktop and laptop maintenance</strong> — repairs, assembly, cleaning, formatting, and setup on Windows and Linux",
        bullet2:
          "<strong>Printers</strong> — setup of toner and color printers",
        bullet3:
          "<strong>CCTV</strong> — installation and configuration of cameras and DVRs",
        bullet4:
          "<strong>Network infrastructure</strong> — rack assembly with server and switch",
      },
    },
    education: {
      usp: {
        degree: "M.Sc. in Computer Science — completed",
        period: "Mar 2023 – Jul 2026",
        note: "Research: AI and Education — Computerized Adaptive Testing (CAT), Item Response Theory (IRT), and Cognitive Diagnostic Models (CDM)",
        dissertation:
          "<strong>Dissertation:</strong> CAT API: Exploring the Application of IRT and CDM Models in Formative Assessment Through Computerized Adaptive Testing",
        linkDissertation: "Dissertation",
        linkCertificate: "Completion certificate",
      },
      ifsp: {
        degree: "Systems Analysis and Development",
        campus: "Araraquara Campus",
        period: "Feb 2020 – Dec 2022",
        linkCertificate: "Completion certificate",
      },
    },
    competitive: {
      sbc: {
        name: "Maratona de Programação — SBC",
        period: "2020",
        result: "Finalist at the national stage",
        desc: "The Brazilian stage of the ICPC, organized by the Brazilian Computer Society: teams of three students solve algorithmic problems in five hours.",
      },
      interif: {
        name: "InterIF",
        period: "2020 · 2022",
        result: "3rd place in 2020 · Finalist in 2022",
        desc: "Programming contest held between campuses of the Federal Institutes network.",
      },
      stack: '<span class="stack-label">Stack:</span> C/C++ and Python',
      beecrowd: "beecrowd profile",
      leetcode: "LeetCode profile",
      canguru: {
        name: "Kangaroo Mathematics Olympiad",
        period: "2016",
        result: "Bronze Medal",
        desc: "Mathematics olympiad applied in schools across Brazil by Canguru de Matemática Brasil.",
      },
      poscomp: {
        name: "POSCOMP",
        period: "2022",
        result: "Score: 34",
        desc: "Brazil's National Exam for Admission to Graduate Programs in Computing: a nationwide assessment of Computer Science knowledge used as an admission criterion for master's and doctoral programs.",
      },
    },
    projects: {
      catapi: {
        name: "CAT API",
        period: "2023 – 2026",
        type: "Master's Research — ICMC-USP",
        stack:
          '<span class="stack-label">Stack:</span> Python + Django · adaptive service in R (mirtCAT + plumber) · custom CD-CAT · MariaDB · React + Redux + styled-components · Docker · automated CI/CD · Ubuntu web server',
        desc_1:
          "Abstract: CAT API is a computational solution aimed at the application of Computerized Adaptive Testing (CAT) in the context of formative assessment. The proposed solution consists of an open-source educational API that integrates Item Response Theory (IRT) models and Cognitive Diagnostic Models (CDM), which are well-established methodologies in the field of Psychometrics. The main objective is to reduce the technical and conceptual barriers associated with the adoption of adaptive assessments by means of a modular architecture with low integration effort and a reduced learning curve, enabling different educational platforms and client systems to seamlessly incorporate adaptive testing.",
        desc_2:
          "The API is designed to support both proficiency estimation and the identification of specific skills and attributes mastered by students, providing more precise and informative assessments when compared to classical testing approaches. The evaluation of the solution comprised controlled tests based on simulations, as well as practical tests conducted in real classroom settings, allowing the analysis of its behavior in real-world educational scenarios. The results indicate that the proposed approach is feasible, flexible, and capable of delivering meaningful information to evaluators, contributing to the broader adoption of adaptive assessments in diverse educational contexts.",
      },
      ic: {
        name: "Learning Analytics in DIO's E-learning Platform",
        period: "2021 – 2022",
        type: "Undergraduate Research — IFSP",
        title:
          "<strong>Title:</strong> Application of Learning Analytics to Identify Aspects of Non-Completion of a Course by a Student on the Digital Innovation One Platform",
        desc:
          "Undergraduate research applied to Digital Innovation One's (DIO) e-learning platform, a community of more than 2.4 million students. The goal was to apply Learning Analytics to understand student behavior and identify the aspects that lead to non-completion of courses and bootcamps, contributing to validating the teaching methodology and evaluating the performance of the content offered.",
      },
    },
  },
};
