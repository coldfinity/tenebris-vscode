// Sanity checks for the theme extension. Run with `npm run validate`.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const errors = [];
const fail = (msg) => errors.push(msg);

function readJson(rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
  } catch (e) {
    fail(`${rel}: ${e.message}`);
    return null;
  }
}

const pkg = readJson("package.json");
const { themes = [], iconThemes = [] } = (pkg && pkg.contributes) || {};

for (const t of themes) {
  const theme = readJson(t.path);
  if (theme && !theme.colors) fail(`${t.path}: missing "colors"`);
  if (theme && !Array.isArray(theme.tokenColors)) fail(`${t.path}: missing "tokenColors"`);
  if (theme) {
    const bad = JSON.stringify(theme).match(/"#(?![0-9a-fA-F]{3,4}"|[0-9a-fA-F]{6}"|[0-9a-fA-F]{8}")[^"]*"/g);
    if (bad) fail(`${t.path}: invalid colour values: ${[...new Set(bad)].join(", ")}`);
  }
}

for (const t of iconThemes) {
  const iconTheme = readJson(t.path);
  if (!iconTheme) continue;
  const dir = path.dirname(path.join(root, t.path));
  for (const [id, def] of Object.entries(iconTheme.iconDefinitions || {})) {
    if (!fs.existsSync(path.join(dir, def.iconPath))) fail(`${t.path}: "${id}" -> missing ${def.iconPath}`);
  }
  const defined = new Set(Object.keys(iconTheme.iconDefinitions || {}));
  for (const key of ["file", "folder", "folderExpanded"]) {
    if (iconTheme[key] && !defined.has(iconTheme[key])) fail(`${t.path}: "${key}" references undefined icon ${iconTheme[key]}`);
  }
  for (const group of ["fileExtensions", "fileNames", "languageIds", "folderNames", "folderNamesExpanded"]) {
    for (const [k, id] of Object.entries(iconTheme[group] || {})) {
      if (!defined.has(id)) fail(`${t.path}: ${group}.${k} references undefined icon ${id}`);
    }
  }
}

if (pkg) {
  if (pkg.icon && !fs.existsSync(path.join(root, pkg.icon))) fail(`package.json: icon ${pkg.icon} not found`);
  const changelog = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8");
  if (!changelog.includes(`## [${pkg.version}]`)) fail(`CHANGELOG.md: no entry for version ${pkg.version}`);
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log("✓ theme, icon theme, package.json and changelog look good");
