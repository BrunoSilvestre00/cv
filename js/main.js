/**
 * main.js — CV Website runtime logic
 *
 * Modules:
 *  - Age calculation (from BIRTHDATE)
 *  - i18n: apply translations, lang toggle, localStorage persistence
 *  - Print: wire up print button
 *
 * Requires: js/i18n.js loaded first (provides window.translations)
 */

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const BIRTHDATE   = new Date("2002-05-28"); // May 28, 2002
const LS_KEY      = 'cv_lang';
const DEFAULT_LANG = 'pt';

// ─────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem(LS_KEY) || DEFAULT_LANG;

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
 * Targets every element with [data-i18n] attribute.
 * @param {string} lang - 'pt' or 'en'
 */
function applyTranslations(lang) {
  // Translate all marked elements
  var elements = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < elements.length; i++) {
    var el  = elements[i];
    var key = el.getAttribute('data-i18n');
    el.textContent = getTranslation(lang, key);
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
    localStorage.setItem(LS_KEY, currentLang);
    applyTranslations(currentLang);
  });
}

// ─────────────────────────────────────────────────────────────
// MODULE: Print
// ─────────────────────────────────────────────────────────────

function setupPrintButton() {
  var btn = document.getElementById('print-btn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    window.print();
  });
}

// ─────────────────────────────────────────────────────────────
// INIT — runs after DOM is fully parsed
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function () {
  renderAge();
  applyTranslations(currentLang);
  setupLangToggle();
  setupPrintButton();
});
