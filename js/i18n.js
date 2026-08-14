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
      print: "Imprimir / PDF",
      langToggle: "EN",
      themeToggle: "Alternar tema claro/escuro",
    },
    sidebar: {
      title: "Engenheiro de Software Fullstack",
      contactHeading: "Contato",
      location: "Araraquara / SP — Brasil",
      infoHeading: "Informações",
      ageLabel: "Idade:",
      englishLabel: "Inglês:",
      skillsProficient: "Habilidades — Proficiente",
      skillsCloud: "Cloud & DevOps",
      skillsAI: "IA & Dados",
      skillsFamiliar: "Habilidades — Familiaridade",
    },
    main: {
      summaryHeading: "Resumo",
      summaryText:
        "Engenheiro de Software Fullstack com mais de {experienceYears} anos construindo produto de ponta a ponta em uma plataforma de educação em tecnologia — do catálogo de conteúdos ao checkout de pagamento, incluindo a infraestrutura AWS que sustenta os dois. Lidero decisões de arquitetura de grandes projetos e atuo nos domínios em que erro custa caro: meios de pagamento, ledger de créditos, autenticação e pipelines de IA generativa em produção. Mestre em Ciências de Computação pelo ICMC-USP, onde além de pesquisar avaliação adaptativa entreguei a solução em produção, validada em turmas reais.",
      experienceHeading: "Experiência",
      educationHeading: "Formação",
      projectsHeading: "Projetos",
      competitiveHeading: "Programação Competitiva",
    },
    badges: {
      master: "🎓 Mestre em Ciências de Computação",
      medal: "🏅 Medalhista InterIF",
      marathon: "🏃 Finalista Maratona SBC",
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
          "<strong>Landing pages automatizadas</strong> e checkout de pagamento",
        proj8:
          "Projetos menores — reformulação de perfil e home, e configuração de campanhas de vendas",
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
      print: "Print / PDF",
      langToggle: "PT",
      themeToggle: "Toggle light/dark theme",
    },
    sidebar: {
      title: "Fullstack Software Engineer",
      contactHeading: "Contact",
      location: "Araraquara / SP — Brazil",
      infoHeading: "Info",
      ageLabel: "Age:",
      englishLabel: "English:",
      skillsProficient: "Skills — Proficient",
      skillsCloud: "Cloud & DevOps",
      skillsAI: "AI & Data",
      skillsFamiliar: "Skills — Familiar",
    },
    main: {
      summaryHeading: "Summary",
      summaryText:
        "Fullstack Software Engineer with {experienceYears}+ years building product end to end at a tech-education platform — from the content catalog to payment checkout, including the AWS infrastructure behind both. I lead architecture decisions on major projects and work in the domains where mistakes are expensive: payment providers, credit ledgers, authentication, and generative AI pipelines in production. M.Sc. in Computer Science from ICMC-USP, where I not only researched adaptive assessment but shipped the solution to production, validated in real classrooms.",
      experienceHeading: "Experience",
      educationHeading: "Education",
      projectsHeading: "Projects",
      competitiveHeading: "Competitive Programming",
    },
    badges: {
      master: "🎓 M.Sc. in Computer Science",
      medal: "🏅 InterIF Medal Winner",
      marathon: "🏃 SBC Marathon Finalist",
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
          "<strong>Automated landing pages</strong> and payment checkout",
        proj8:
          "Smaller projects — profile and home redesign, and sales campaign configuration",
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
    },
  },
};
