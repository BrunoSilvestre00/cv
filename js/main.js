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
const LS_KEY       = 'cv_lang';
const THEME_KEY    = 'cv_theme';
const DEFAULT_LANG = 'pt';

/**
 * @page margins per theme. This cannot live in print.css: @page is not part of
 * the element cascade, so `[data-theme="light"]` can never select it.
 *
 *  light → 12mm on every page. The margin is white-on-white, so it is invisible
 *          and costs nothing, while giving pages 2+ a proper top margin.
 *  dark  → 0, so the dark background bleeds to the paper edge instead of being
 *          framed by an unpainted white border. The inner padding then comes
 *          from `.cv-layout` (see print.css).
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
// MODULE: Age Calculation
// ─────────────────────────────────────────────────────────────

/**
 * Returns the current age in whole years.
 * Correctly handles the edge case of running on the birthday itself.
 * @param {Date} birthdate
 * @returns {number}
 */
function calculateAge(birthdate) {
  var today = new Date();
  var age   = today.getFullYear() - birthdate.getFullYear();
  var hasBirthdayPassed =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());
  if (!hasBirthdayPassed) age--;
  return age;
}

function renderAge() {
  var el = document.getElementById('age-display');
  if (el) el.textContent = calculateAge(BIRTHDATE);
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
  applyPageRule();
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
    style.id = 'page-rule';
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
 * Resolves a dot-notation key against the translations object.
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
  return (result != null) ? result : keyPath;
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
