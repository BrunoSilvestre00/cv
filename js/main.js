/**
 * main.js — CV Website runtime logic
 *
 * Modules:
 *  - Age calculation (from BIRTHDATE)
 *  - Theme: dark/light toggle, localStorage persistence, system-preference default
 *  - Print: @page rule injection (theme-dependent) + print button
 *  - i18n: apply translations, lang toggle, localStorage persistence
 *
 * Requires: js/i18n.js loaded first (provides window.translations)
 *
 * NOTE: the initial theme is applied by an inline script in <head>, not here —
 * this file loads at the end of <body>, which would flash the wrong theme first.
 */

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const BIRTHDATE    = new Date("2002-05-28"); // May 28, 2002
const CAREER_START = new Date("2022-04-01"); // April 2022 — first role (DIO)
const LS_KEY       = 'cv_lang';
const THEME_KEY    = 'cv_theme';
const DEFAULT_LANG = 'pt';

/**
 * @page margins per theme. This cannot live in print.css: @page is not part of
 * the element cascade, so `[data-theme="light"]` can never select it.
 *
 *  light → 12mm on every page. White on white, so the margin is invisible, and
 *          every page (not just the first) gets a proper inset.
 *  dark  → 0, so the dark background bleeds to the sheet edge instead of being
 *          framed by an unpainted white border. The inset then comes from the
 *          padding on .cv-layout (see print.css).
 */
const PAGE_MARGINS = { light: '12mm', dark: '0' };

// ─────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────
let currentLang = readStored(LS_KEY) || DEFAULT_LANG;

/** localStorage can throw (private mode, file:// in some browsers). */
function readStored(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    /* non-fatal: the choice just won't persist */
  }
}

// ─────────────────────────────────────────────────────────────
// MODULE: Elapsed-time helpers
//
// Anything in this CV that would silently go stale — the age, the years of
// experience — is derived from a date here rather than typed into the copy.
// ─────────────────────────────────────────────────────────────

/**
 * Whole years elapsed between `from` and today.
 * Correctly handles the edge case of running on the anniversary itself.
 * @param {Date} from
 * @returns {number}
 */
function wholeYearsSince(from) {
  var today = new Date();
  var years = today.getFullYear() - from.getFullYear();
  var hasAnniversaryPassed =
    today.getMonth() > from.getMonth() ||
    (today.getMonth() === from.getMonth() && today.getDate() >= from.getDate());
  if (!hasAnniversaryPassed) years--;
  return years;
}

function renderAge() {
  var el = document.getElementById('age-display');
  if (el) el.textContent = wholeYearsSince(BIRTHDATE);
}

// ─────────────────────────────────────────────────────────────
// MODULE: Theme
// ─────────────────────────────────────────────────────────────

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  writeStored(THEME_KEY, theme);
  applyPageRule(); // the page margin depends on the theme
}

function setupThemeToggle() {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    setTheme(getTheme() === 'light' ? 'dark' : 'light');
  });
}

/**
 * Follow the OS theme while the visitor hasn't made an explicit choice.
 * Once they click the toggle, the stored value wins forever.
 */
function setupSystemThemeSync() {
  if (!window.matchMedia) return;
  var mq = window.matchMedia('(prefers-color-scheme: light)');
  var onChange = function (e) {
    if (readStored(THEME_KEY)) return; // explicit choice takes precedence
    document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    applyPageRule();
  };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange); // older Safari
}

// ─────────────────────────────────────────────────────────────
// MODULE: Print
// ─────────────────────────────────────────────────────────────

/** Writes the theme-appropriate @page rule into a single reused <style>. */
function applyPageRule() {
  var style = document.getElementById('page-rule');
  if (!style) {
    style = document.createElement('style');
    style.id    = 'page-rule';
    style.media = 'print';
    document.head.appendChild(style);
  }
  style.textContent =
    '@page { size: A4 portrait; margin: ' + PAGE_MARGINS[getTheme()] + '; }';
}

function setupPrintButton() {
  var btn = document.getElementById('print-btn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    applyPageRule(); // belt and braces — beforeprint also covers Ctrl+P
    window.print();
  });
}

// ─────────────────────────────────────────────────────────────
// MODULE: i18n — Translation Application
// ─────────────────────────────────────────────────────────────

/**
 * Values injected into translation strings via {placeholder} tokens.
 *
 * Recomputed on every lookup rather than cached at load time, so a tab left
 * open across an anniversary still renders the right number.
 *
 * @returns {Object<string, string|number>}
 */
function i18nVars() {
  return {
    experienceYears: wholeYearsSince(CAREER_START),
  };
}

/**
 * Substitutes {placeholder} tokens in a translation string.
 * Unknown tokens are left untouched so a typo stays visible instead of
 * silently collapsing to an empty string.
 * @param {string} str
 * @returns {string}
 */
function interpolate(str) {
  var vars = i18nVars();
  return str.replace(/\{(\w+)\}/g, function (token, key) {
    return Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : token;
  });
}

/**
 * Resolves a dot-notation key against the translations object, then applies
 * {placeholder} interpolation.
 * e.g. "main.summaryText" → translations[lang].main.summaryText
 * Falls back to the key path itself if not found (useful for debugging).
 * @param {string} lang
 * @param {string} keyPath
 * @returns {string}
 */
function getTranslation(lang, keyPath) {
  var parts  = keyPath.split('.');
  var result = window.translations[lang];
  for (var i = 0; i < parts.length; i++) {
    if (result == null) return keyPath; // graceful fallback
    result = result[parts[i]];
  }
  if (result == null) return keyPath;
  return (typeof result === 'string') ? interpolate(result) : result;
}

/**
 * Applies all translations for the given language to the DOM.
 *
 * Three attributes are supported:
 *   [data-i18n]      → textContent (safe; wipes any child elements)
 *   [data-i18n-html] → innerHTML, for strings carrying inline markup such as
 *                      <strong> labels. ONLY for strings authored in
 *                      js/i18n.js — never feed user input through this.
 *   [data-i18n-aria] → aria-label
 *
 * @param {string} lang - 'pt' or 'en'
 */
function applyTranslations(lang) {
  var i;

  // Plain text nodes
  var textEls = document.querySelectorAll('[data-i18n]');
  for (i = 0; i < textEls.length; i++) {
    textEls[i].textContent = getTranslation(lang, textEls[i].getAttribute('data-i18n'));
  }

  // Strings with inline markup (repo-authored only — see doc comment above)
  var htmlEls = document.querySelectorAll('[data-i18n-html]');
  for (i = 0; i < htmlEls.length; i++) {
    htmlEls[i].innerHTML = getTranslation(lang, htmlEls[i].getAttribute('data-i18n-html'));
  }

  // Accessible labels
  var ariaEls = document.querySelectorAll('[data-i18n-aria]');
  for (i = 0; i < ariaEls.length; i++) {
    ariaEls[i].setAttribute('aria-label', getTranslation(lang, ariaEls[i].getAttribute('data-i18n-aria')));
  }

  // Update document <title>
  document.title = getTranslation(lang, 'meta.title');

  // Update lang-toggle button flag (shows flag of language to switch TO)
  var langFlag = document.getElementById('lang-flag');
  if (langFlag) {
    var nextLang = (lang === 'pt') ? 'en' : 'pt';
    langFlag.src = (nextLang === 'en') ? 'assets/img/us-flag.png' : 'assets/img/brazil-flag.png';
    langFlag.alt = (nextLang === 'en') ? 'English' : 'Português';
    var langBtn  = document.getElementById('lang-toggle');
    if (langBtn) langBtn.setAttribute('aria-label', 'Switch to ' + langFlag.alt);
  }

  // Update <html lang> for screen readers
  document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : 'en';
}

// ─────────────────────────────────────────────────────────────
// MODULE: Language Toggle
// ─────────────────────────────────────────────────────────────

function setupLangToggle() {
  var btn = document.getElementById('lang-toggle');
  if (!btn) return;

  btn.addEventListener('click', function () {
    currentLang = (currentLang === 'pt') ? 'en' : 'pt';
    writeStored(LS_KEY, currentLang);
    applyTranslations(currentLang);
  });
}

// ─────────────────────────────────────────────────────────────
// INIT — runs after DOM is fully parsed
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  renderAge();
  applyTranslations(currentLang);
  setupLangToggle();
  setupThemeToggle();
  setupSystemThemeSync();
  setupPrintButton();
  applyPageRule();
});

// Covers Ctrl+P / File → Print, which bypass the print button entirely.
window.addEventListener('beforeprint', applyPageRule);
