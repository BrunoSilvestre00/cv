/**
 * i18n.js — Translation data for PT-BR and EN
 * Loaded as a global (window.translations) to work on file:// without CORS issues.
 *
 * controls.langToggle stores the label to switch TO (not the current lang):
 *   PT active  → button shows "EN"
 *   EN active  → button shows "PT"
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
    },
    sidebar: {
      title: "Engenheiro de Software Fullstack",
      contactHeading: "Contato",
      location: "Araraquara / SP — Brasil",
      infoHeading: "Informações",
      ageLabel: "Idade:",
      englishLabel: "Inglês:",
      skillsProficient: "Habilidades — Proficiente",
      skillsFamiliar: "Habilidades — Familiaridade",
    },
    main: {
      summaryHeading: "Resumo",
      summaryText:
        "Desenvolvedor Fullstack com 4 anos de experiência no mercado, unindo rigor acadêmico com agilidade na entrega de produtos. Finalizando Mestrado no ICMC-USP, pesquisando Inteligência Artificial e Educação (CAT, IRT, CDM). Graduado em Análise e Desenvolvimento de Sistemas pelo IFSP. Medalhista em InterIF, finalista da Maratona de Programação SBC. Atua com Python e JavaScript, construindo arquiteturas escaláveis em nuvem e integrando modelos de IA a aplicações reais.",
      experienceHeading: "Experiência",
      educationHeading: "Formação",
      projectsHeading: "Projetos",
    },
    badges: {
      medal: "🏅 Medalhista InterIF",
      marathon: "🏃 Finalista Maratona SBC",
    },
    experience: {
      dio: {
        period: "Abr 2022 – Presente",
        role: "Engenheiro de Software Fullstack Pleno",
        bullet1:
          "Landing pages automatizadas, catálogo de conteúdos e checkout de pagamento",
        bullet2: "Fluxo de ensino, educação e disponibilização de conteúdos",
        bullet3: "Talent-match — plataforma B2B para contratação de talentos",
      },
    },
    education: {
      usp: {
        degree: "Mestrado em Ciências de Computação",
        period: "Mar 2023 – Ago 2026 (previsto)",
        note: "Pesquisa: IA e Educação — Testes Adaptativos Computadorizados (CAT), Teoria de Resposta ao Item (IRT) e Modelos de Diagnóstico Cognitivo (CDM)",
      },
      ifsp: {
        degree: "Análise e Desenvolvimento de Sistemas",
        campus: "Campus Araraquara",
        period: "Fev 2020 – Dez 2022",
      },
    },
    projects: {
      catapi: {
        name: "CAT API",
        period: "2023 – Presente",
        type: "Mestrado / Pesquisa — ICMC-USP",
        desc_1: "Resumo: CAT API é uma solução computacional voltada à aplicação de Testes Adaptativos Computadorizados (TAC) no contexto da avaliação formativa. A solução proposta consiste em uma API educacional de código aberto que integra modelos da Teoria de Resposta ao Item (TRI) e Modelos de Diagnóstico Cognitivo (MDC), metodologias amplamente consolidadas na área da Psicometria. O objetivo principal é reduzir as barreiras técnicas e conceituais associadas à adoção de avaliações adaptativas, por meio de uma arquitetura modular, de fácil integração e com baixa curva de aprendizagem, permitindo que diferentes plataformas educacionais e sistemas clientes incorporem testes adaptativos de forma transparente.",
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
    },
    sidebar: {
      title: "Fullstack Software Engineer",
      contactHeading: "Contact",
      location: "Araraquara / SP — Brazil",
      infoHeading: "Info",
      ageLabel: "Age:",
      englishLabel: "English:",
      skillsProficient: "Skills — Proficient",
      skillsFamiliar: "Skills — Familiar",
    },
    main: {
      summaryHeading: "Summary",
      summaryText:
        "Fullstack Software Engineer with 4 years of industry experience, combining academic rigor with fast product delivery. Currently completing a Master's degree at ICMC-USP, researching Artificial Intelligence and Education (CAT, IRT, CDM). Graduated in Systems Analysis and Development from IFSP. Medal winner at InterIF, finalist at the SBC Programming Marathon. Works with Python and JavaScript, building scalable cloud architectures and integrating AI models into real-world applications.",
      experienceHeading: "Experience",
      educationHeading: "Education",
      projectsHeading: "Projects",
    },
    badges: {
      medal: "🏅 InterIF Medal Winner",
      marathon: "🏃 SBC Marathon Finalist",
    },
    experience: {
      dio: {
        period: "Apr 2022 – Present",
        role: "Mid-level Fullstack Software Engineer",
        bullet1:
          "Automated landing pages, content catalog, and payment checkout",
        bullet2: "Teaching/education flow and content delivery systems",
        bullet3: "Talent-match — B2B platform for talent acquisition",
      },
    },
    education: {
      usp: {
        degree: "Master's in Computer Science",
        period: "Mar 2023 – Aug 2026 (expected)",
        note: "Research: AI and Education — Computerized Adaptive Testing (CAT), Item Response Theory (IRT), and Cognitive Diagnostic Models (CDM)",
      },
      ifsp: {
        degree: "Systems Analysis and Development",
        campus: "Araraquara Campus",
        period: "Feb 2020 – Dec 2022",
      },
    },
    projects: {
      catapi: {
        name: "CAT API",
        period: "2023 – Present",
        type: "Master's Research — ICMC-USP",
        desc_1:
          "Abstract: CAT API is a computational solution aimed at the application of Computerized Adaptive Testing (CAT) in the context of formative assessment. The proposed solution consists of an open-source educational API that integrates Item Response Theory (IRT) models and Cognitive Diagnostic Models (CDM), which are well-established methodologies in the field of Psychometrics. The main objective is to reduce the technical and conceptual barriers associated with the adoption of adaptive assessments by means of a modular architecture with low integration effort and a reduced learning curve, enabling different educational platforms and client systems to seamlessly incorporate adaptive testing.",
        desc_2:
          "The API is designed to support both proficiency estimation and the identification of specific skills and attributes mastered by students, providing more precise and informative assessments when compared to classical testing approaches. The evaluation of the solution comprised controlled tests based on simulations, as well as practical tests conducted in real classroom settings, allowing the analysis of its behavior in real-world educational scenarios. The results indicate that the proposed approach is feasible, flexible, and capable of delivering meaningful information to evaluators, contributing to the broader adoption of adaptive assessments in diverse educational contexts.",
      },
    },
  },
};
