#!/usr/bin/env node
/**
 * scripts/generate-pdfs.js
 *
 * Renders exports/cv-pt.pdf and exports/cv-en.pdf — the files the header's
 * "Baixar PDF" button downloads (see js/main.js: setupDownloadButton).
 * Always the light theme, matching what the button itself always fetches.
 * Lives in exports/ alongside exports/cv-*.md, keeping the repo root free of
 * generated files — index.html finds them there via a relative path.
 *
 * Run by .github/workflows/generate-pdf.yml on every push to main. Locally:
 *
 *   npm install
 *   node scripts/generate-pdfs.js
 *
 * ── Why Puppeteer, not a bare `chrome --print-to-pdf` CLI call ──
 * That was the original approach, and it failed in a way worth recording:
 * the very first two runs of the workflow that used it hung for 6 hours each
 * (GitHub's default job timeout) and were cancelled without ever producing a
 * PDF — silently, undetected until a later, unrelated change. Once a
 * `timeout` wrapper was added and the hang started failing fast instead of
 * slow, six different flag combinations were tried against the real page
 * (both headless modes, with/without --virtual-time-budget, with/without
 * --run-all-compositor-stages-before-draw, with Google Fonts blocked at the
 * DNS level) — all failed identically. A smoke test against a trivial
 * `data:text/html,<h1>hi</h1>` page, no server or CSS involved at all, hung
 * the exact same way. That ruled out this page, this server, and this CSS
 * entirely: --print-to-pdf itself does not return on that runner + Chrome
 * build combination, for any input.
 *
 * Puppeteer drives the same underlying browser through the DevTools
 * Protocol's Page.printToPDF instead of the standalone CLI flag — a path
 * with far more real-world CI mileage than the flag, and confirmed working
 * end to end (0 rasterised images, all fonts embedded, all links intact)
 * before this script replaced the CLI-based version.
 *
 * This is the only file in the repo with an npm dependency, and it is a
 * devDependency: nothing about the deployed site (index.html, css/, js/)
 * changes or requires a build step. See package.json's description.
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
};

/** Minimal static file server over the repo root, on an OS-assigned port —
 * self-contained so this script needs nothing already running. */
function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const filePath = path.join(ROOT, urlPath === '/' ? '/index.html' : urlPath);
      if (!filePath.startsWith(ROOT)) {
        res.writeHead(403).end('Forbidden');
        return;
      }
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404).end('Not found');
          return;
        }
        const type = MIME_TYPES[path.extname(filePath)] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': type }).end(data);
      });
    });
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function main() {
  const server = await startServer();
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const outDir = path.join(ROOT, 'exports');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const lang of ['pt', 'en']) {
      const page = await browser.newPage();
      await page.goto(`${baseUrl}/index.html?lang=${lang}&theme=light`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });
      const outPath = path.join(outDir, `cv-${lang}.pdf`);
      await page.pdf({
        path: outPath,
        printBackground: true,
        // Use print.css's own @page size/margin (set per-theme by
        // applyPageRule() in main.js) instead of Puppeteer's Letter default.
        preferCSSPageSize: true,
      });
      await page.close();
      console.log(`wrote ${path.relative(ROOT, outPath)} (${fs.statSync(outPath).size} bytes)`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('generate-pdfs failed:', err);
  process.exit(1);
});
