/**
 * Updates sitemap.xml lastmod dates based on git commit history.
 * Maps each URL to its source file and reads the last commit date.
 *
 * Run: node scripts/update-sitemap-lastmod.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITEMAP = join(__dirname, '..', 'public', 'sitemap.xml');

// Map URL paths to source files for git log lookup
const URL_TO_FILE = {
  '/': 'src/pages/LandingPage.jsx',
  '/blog': 'src/pages/BlogPage.jsx',
  '/privacy-policy.html': 'public/privacy-policy.html',
  '/terms-of-service.html': 'public/terms-of-service.html',
};

function getGitDate(filePath) {
  try {
    const date = execSync(`git log -1 --format=%cs -- "${filePath}"`, { encoding: 'utf-8' }).trim();
    return date || null;
  } catch {
    return null;
  }
}

function getFileForUrl(urlPath) {
  if (URL_TO_FILE[urlPath]) return URL_TO_FILE[urlPath];
  // Blog articles: /blog/slug -> src/pages/blog/*.jsx
  const match = urlPath.match(/^\/blog\/(.+)$/);
  if (match) {
    const slug = match[1];
    // Find the jsx file by slug grep
    try {
      const result = execSync(`grep -rl 'slug="${slug}"\\|SLUG = .${slug}.' src/pages/blog/ 2>/dev/null`, { encoding: 'utf-8' }).trim();
      return result.split('\n')[0] || null;
    } catch {
      return null;
    }
  }
  return null;
}

let xml = readFileSync(SITEMAP, 'utf-8');
let updated = 0;

const urlRegex = /<url>\s*<loc>https:\/\/kmfjournal\.com(\/[^<]*)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g;
let match;

while ((match = urlRegex.exec(xml)) !== null) {
  const urlPath = match[1] || '/';
  const oldDate = match[2];
  const file = getFileForUrl(urlPath);

  if (file) {
    const gitDate = getGitDate(file);
    if (gitDate && gitDate !== oldDate) {
      xml = xml.replace(`<loc>https://kmfjournal.com${urlPath}</loc>\n    <lastmod>${oldDate}</lastmod>`, `<loc>https://kmfjournal.com${urlPath}</loc>\n    <lastmod>${gitDate}</lastmod>`);
      console.log(`  ${urlPath}: ${oldDate} → ${gitDate}`);
      updated++;
    }
  }
}

writeFileSync(SITEMAP, xml);
console.log(`\nDone — ${updated} dates updated in sitemap.xml`);
