#!/usr/bin/env node
/**
 * scripts/generate-resume-md.js
 *
 * Renders js/i18n.js into exports/cv-pt.md and exports/cv-en.md — a
 * plain-text résumé for anywhere Markdown is welcome and a PDF/HTML page
 * isn't (a Git hosting profile README, a plain-text paste, grep-friendly
 * archival). exports/ is a dedicated home for generated artifacts, kept
 * separate from cv-pt.pdf/cv-en.pdf at the repo root (those are fetched by
 * relative URL from the deployed site — see js/main.js — so they stay put).
 *
 * Run by .github/workflows/generate-pdf.yml on every push to main. Also
 * runnable locally:
 *
 *   node scripts/generate-resume-md.js
 *
 * No install step — only Node's built-in modules (fs, path, vm).
 *
 * ── Why this loads i18n.js AND main.js instead of just reading the JSON ──
 * i18n.js is the single source of truth for every translated string, but the
 * TEXT alone isn't enough: {experienceYears} needs interpolating, and dot-path
 * lookup needs resolving. Both already exist in main.js (interpolate(),
 * getTranslation(), wholeYearsSince()). Re-implementing them here would create
 * a second copy that silently drifts the day either one changes. Instead this
 * script loads both files into a tiny vm context — the same relationship
 * index.html has with them (i18n.js before main.js) — and calls their own
 * functions. A future change to CAREER_START or to the interpolation syntax
 * is picked up automatically, with zero duplication.
 *
 * main.js's bottom-level statements (document.addEventListener(...),
 * window.addEventListener('beforeprint', ...)) need `document`/`window` to
 * exist to not throw on load, so the context stubs those two methods as
 * no-ops. Nothing else executes: DOMContentLoaded never fires in a script
 * that never calls it, so renderAge()/applyTranslations()/etc. never run —
 * only their function declarations become available for this script to call
 * directly.
 *
 * ── What IS duplicated here, unavoidably ──
 * A handful of things live in index.html but never made it into i18n.js
 * because they are IDENTICAL in both languages: contact hrefs, external links
 * (dissertation, certificates, project repos, competition/profile links), and
 * the skill-tag lists (tech names don't translate). Those are hardcoded below,
 * same as index.html. If they change there, update them here too — this
 * script has no way to discover them on its own, short of parsing HTML, which
 * would be far more fragile than a short manifest kept in one place.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

// ── Manifest: the parts that aren't in i18n.js because they don't translate ──
const CONTACT = {
  email: 'bruno.ap.silvestre@gmail.com',
  phone: '+55 (14) 98824-6613',
  phoneHref: 'tel:+5514988246613',
  linkedin: 'https://www.linkedin.com/in/bruno-silvestre-aa970820b/',
  github: 'https://github.com/BrunoSilvestre00',
  lattes: 'http://lattes.cnpq.br/9798985966699271',
  // Hardcoded in index.html with no data-i18n — the label stays Portuguese
  // even on the English page. Mirrored here rather than "fixed", to render
  // exactly what the live site renders.
  lattesLabel: 'Currículo Lattes',
  duolingoCert: 'https://certs.duolingo.com/3c7vqmarcwmqzqkb',
};

const LINKS = {
  dio: 'https://dio.me/',
  dioWeb: 'https://web.dio.me/',
  icmcUsp: 'https://www.icmc.usp.br/',
  uspDissertation:
    'https://drive.google.com/file/d/11hoGpRHbuZn6gRuxmgRfUnmf3s3usmA9/view?usp=sharing',
  uspCertificate:
    'https://drive.google.com/file/d/15wBzHUohVO2E2BIKvcbguki4X2fsp6KF/view?usp=drivesdk',
  ifsp: 'https://www.arq.ifsp.edu.br/',
  ifspCertificate:
    'https://drive.google.com/file/d/1KcwHOWfD2IhL3Iq1GT5wdRcvjk8OR4Hq/view',
  catapiRepo: 'https://github.com/cat-api-icmc/master-cat-api',
  sbcMarathon: 'https://maratona.sbc.org.br/',
  beecrowd: 'https://judge.beecrowd.com/pt/profile/491514',
  leetcode: 'https://leetcode.com/u/BrunoSilvestre00/',
};

// Same tag list in both languages — tech names don't translate. Keep in sync
// with the <ul class="skill-tags"> lists in index.html.
const SKILLS = {
  proficient: [
    'Python', 'Django', 'FastAPI', 'TypeScript', 'JavaScript', 'ReactJS',
    'Redux', 'Vite', 'HTML', 'CSS', 'Tailwind CSS', 'styled-components',
    'EJS', 'SQL', 'PostgreSQL', 'MySQL / Aurora', 'MariaDB', 'Redis',
    'Celery', 'Docker', 'Git / GitHub',
  ],
  cloud: [
    'AWS ECS', 'AWS Lambda', 'AWS S3', 'CloudFront', 'EventBridge', 'SQS',
    'SES', 'AWS EC2', 'Terraform', 'GitHub Actions', 'Keycloak (SSO)',
  ],
  ai: [
    'LangChain', 'Langflow', 'OpenAI API', 'Qdrant', 'Chroma', 'Neo4j',
    'R (mirtCAT)', 'Claude Code / Codex', 'MCP',
  ],
  familiar: [
    'Java', 'Spring', 'Angular', 'Android (Java)', 'C', 'C++', 'C#', 'Go',
    'Firebase',
  ],
};

// ── Load i18n.js + main.js the same way index.html does ──────────────────
function loadTranslationRuntime() {
  const context = {
    document: { addEventListener() {} },
    window: { addEventListener() {} },
  };
  vm.createContext(context);
  const i18nSrc = fs.readFileSync(path.join(ROOT, 'js/i18n.js'), 'utf8');
  const mainSrc = fs.readFileSync(path.join(ROOT, 'js/main.js'), 'utf8');
  vm.runInContext(i18nSrc, context, { filename: 'js/i18n.js' });
  vm.runInContext(mainSrc, context, { filename: 'js/main.js' });
  // main.js declares BIRTHDATE/CAREER_START with `const` and translations
  // lives on `window`, none of which land on the context object itself —
  // only `function` declarations do. Pull out exactly what this script
  // needs into a plain object, from inside the same persistent vm realm
  // where those bindings are still in scope.
  vm.runInContext(
    'globalThis.__exports__ = { translations: window.translations, getTranslation, wholeYearsSince, BIRTHDATE };',
    context,
    { filename: 'js/main.js (export shim)' }
  );
  return context.__exports__;
}

/** Values for keys matching `${prefix}<number>` on `obj`, sorted numerically —
 * so experience.dio.proj1..proj9, hl1..hl11, mmv.bullet1..bullet4 are all
 * discovered automatically. A 10th project added as `proj10` needs no change
 * here. */
function numberedKeys(obj, prefix) {
  const re = new RegExp('^' + prefix + '(\\d+)$');
  return Object.keys(obj)
    .map((k) => ({ k, n: Number((k.match(re) || [])[1]) }))
    .filter((x) => !Number.isNaN(x.n))
    .sort((a, b) => a.n - b.n)
    .map((x) => x.k);
}

/** i18n.js's own header comment documents its full inline-markup vocabulary:
 * <strong> and <span class="stack-label">. This covers exactly that — nothing
 * more — so an unrecognized tag falls through to assertPlainText() below
 * instead of silently emitting broken Markdown. */
function htmlToMd(s) {
  return s
    .replace(/<span class="stack-label">(.*?)<\/span>/g, '**$1**')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**');
}

function assertPlainText(s, where) {
  if (/<[a-z][^>]*>/i.test(s)) {
    throw new Error(
      `generate-resume-md: unconverted HTML tag in ${where}: ${JSON.stringify(s)}`
    );
  }
  return s;
}

function buildMarkdown(lang, ctx) {
  const tree = ctx.translations[lang];
  const t = (key) => assertPlainText(htmlToMd(String(ctx.getTranslation(lang, key))), key);
  const age = ctx.wholeYearsSince(ctx.BIRTHDATE);

  const L = [];
  const h = (n, text) => { L.push('#'.repeat(n) + ' ' + text, ''); };
  const p = (text) => { L.push(text, ''); };
  const li = (text) => L.push('- ' + text);
  const blankLine = () => L.push('');
  const rule = () => { L.push('---', ''); };
  const bulletsFrom = (obj, keyPrefix, fullKeyPrefix) =>
    numberedKeys(obj, keyPrefix).forEach((k) => li(t(fullKeyPrefix + '.' + k)));

  // ── Header ──────────────────────────────────────────────────────────
  h(1, 'Bruno Ap. Silvestre');
  p('**' + t('sidebar.title') + '**');
  p(
    [
      `[${CONTACT.email}](mailto:${CONTACT.email})`,
      `[${CONTACT.phone}](${CONTACT.phoneHref})`,
      t('sidebar.location'),
      `[LinkedIn](${CONTACT.linkedin})`,
      `[GitHub](${CONTACT.github})`,
      `[${CONTACT.lattesLabel}](${CONTACT.lattes})`,
    ].join(' · ')
  );
  p(
    [
      `${t('sidebar.ageLabel')} ${age}`,
      `${t('sidebar.portugueseLabel')} ${t('sidebar.portugueseLevel')}`,
      `${t('sidebar.englishLabel')} [CEFR B2](${CONTACT.duolingoCert})`,
    ].join(' · ')
  );
  rule();

  // ── Summary ─────────────────────────────────────────────────────────
  h(2, t('main.summaryHeading'));
  p(t('main.summaryP1'));
  p(t('main.summaryP2'));
  p([t('badges.master'), t('badges.medal'), t('badges.marathon'), 'CEFR B2'].join(' · '));
  rule();

  // ── Skills (not in i18n.js — see file header) ──────────────────────
  h(2, lang === 'pt' ? 'Habilidades' : 'Skills');
  p(`**${t('sidebar.skillsProficient')}:** ${SKILLS.proficient.join(', ')}`);
  p(`**${t('sidebar.skillsCloud')}:** ${SKILLS.cloud.join(', ')}`);
  p(`**${t('sidebar.skillsAI')}:** ${SKILLS.ai.join(', ')}`);
  p(`**${t('sidebar.skillsFamiliar')}:** ${SKILLS.familiar.join(', ')}`);
  rule();

  // ── Experience ──────────────────────────────────────────────────────
  h(2, t('main.experienceHeading'));

  h(3, `[DIO](${LINKS.dio}) · [web.dio.me](${LINKS.dioWeb}) — ${t('experience.dio.period')}`);
  p('*' + t('experience.dio.role') + '*');
  p(t('experience.dio.progression'));
  p(t('experience.dio.stack'));
  p(t('experience.dio.lead'));
  p('**' + t('experience.dio.projectsLabel') + '**');
  bulletsFrom(tree.experience.dio, 'proj', 'experience.dio');
  blankLine();
  p('**' + t('experience.dio.highlightsLabel') + '**');
  bulletsFrom(tree.experience.dio, 'hl', 'experience.dio');
  blankLine();

  h(3, `Grupo MMV — ${t('experience.mmv.period')}`);
  p('*' + t('experience.mmv.role') + '*');
  bulletsFrom(tree.experience.mmv, 'bullet', 'experience.mmv');
  blankLine();
  rule();

  // ── Education ───────────────────────────────────────────────────────
  h(2, t('main.educationHeading'));

  h(3, `[ICMC/USP](${LINKS.icmcUsp}) — ${t('education.usp.period')}`);
  p('*' + t('education.usp.degree') + '*');
  p(t('education.usp.note'));
  p(t('education.usp.dissertation'));
  p(
    `[${t('education.usp.linkDissertation')}](${LINKS.uspDissertation}) · ` +
      `[${t('education.usp.linkCertificate')}](${LINKS.uspCertificate})`
  );
  blankLine();

  h(3, `[IFSP — ${t('education.ifsp.campus')}](${LINKS.ifsp}) — ${t('education.ifsp.period')}`);
  p('*' + t('education.ifsp.degree') + '*');
  p(`[${t('education.ifsp.linkCertificate')}](${LINKS.ifspCertificate})`);
  blankLine();
  rule();

  // ── Projects ────────────────────────────────────────────────────────
  h(2, t('main.projectsHeading'));

  h(3, `[${t('projects.catapi.name')}](${LINKS.catapiRepo}) — ${t('projects.catapi.period')}`);
  p('*' + t('projects.catapi.type') + '*');
  p(t('projects.catapi.stack'));
  p(t('projects.catapi.desc_1'));
  p(t('projects.catapi.desc_2'));
  blankLine();

  h(3, `${t('projects.ic.name')} — ${t('projects.ic.period')}`);
  p('*' + t('projects.ic.type') + '*');
  p(t('projects.ic.title'));
  p(t('projects.ic.desc'));
  blankLine();
  rule();

  // ── Academic Competitions ──────────────────────────────────────────
  h(2, t('main.competitiveHeading'));

  h(3, `[${t('competitive.sbc.name')}](${LINKS.sbcMarathon}) — ${t('competitive.sbc.period')}`);
  p('*' + t('competitive.sbc.result') + '*');
  p(t('competitive.sbc.desc'));
  blankLine();

  h(3, `${t('competitive.interif.name')} — ${t('competitive.interif.period')}`);
  p('*' + t('competitive.interif.result') + '*');
  p(t('competitive.interif.desc'));
  blankLine();

  p(
    `${t('competitive.stack')} — [${t('competitive.beecrowd')}](${LINKS.beecrowd}) · ` +
      `[${t('competitive.leetcode')}](${LINKS.leetcode})`
  );
  blankLine();

  h(3, `${t('competitive.canguru.name')} — ${t('competitive.canguru.period')}`);
  p('*' + t('competitive.canguru.result') + '*');
  p(t('competitive.canguru.desc'));
  blankLine();

  h(3, `${t('competitive.poscomp.name')} — ${t('competitive.poscomp.period')}`);
  p('*' + t('competitive.poscomp.result') + '*');
  p(t('competitive.poscomp.desc'));

  return L.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function main() {
  const ctx = loadTranslationRuntime();
  const ptKeys = Object.keys(ctx.translations.pt);
  const enKeys = Object.keys(ctx.translations.en);
  const onlyPt = ptKeys.filter((k) => !enKeys.includes(k));
  const onlyEn = enKeys.filter((k) => !ptKeys.includes(k));
  if (onlyPt.length || onlyEn.length) {
    throw new Error(
      `generate-resume-md: pt/en top-level keys diverge — onlyPt=${onlyPt}, onlyEn=${onlyEn}`
    );
  }

  const outDir = path.join(ROOT, 'exports');
  fs.mkdirSync(outDir, { recursive: true });

  for (const lang of ['pt', 'en']) {
    const md = buildMarkdown(lang, ctx);
    const outPath = path.join(outDir, `cv-${lang}.md`);
    fs.writeFileSync(outPath, md, 'utf8');
    console.log(`wrote ${path.relative(ROOT, outPath)} (${md.length} bytes)`);
  }
}

main();
