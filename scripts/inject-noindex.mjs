// Adds <meta name="robots" content="noindex,nofollow" /> to a built HTML file.
// Used by scripts/encrypt-locked.sh after staticrypt to ensure search engines
// never index the password prompt page (even if a URL leaks).

import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node inject-noindex.mjs <html-file>");
  process.exit(1);
}

const html = fs.readFileSync(file, "utf8");

if (html.includes('name="robots"')) {
  process.exit(0);
}

const META = '<meta name="robots" content="noindex,nofollow" />';
const modified = html.replace(
  '<meta charset="utf-8" />',
  `<meta charset="utf-8" />\n        ${META}`,
);

fs.writeFileSync(file, modified);
