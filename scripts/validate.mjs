#!/usr/bin/env node
/**
 * Structural validation for this marketplace. Plain Node, no dependencies.
 *
 *   node scripts/validate.mjs [repoRoot]
 *
 * Adding a rule means adding one function to CHECKS. Each check takes the
 * loaded repo context and returns findings; nothing shares mutable state.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const MARKETPLACE_MANIFEST = join('.claude-plugin', 'marketplace.json');
const PLUGIN_MANIFEST = join('.claude-plugin', 'plugin.json');
const PLUGINS_DIR = 'plugins';

/** Files whose frontmatter Claude Code needs, and the fields it needs there. */
const FRONTMATTER_TARGETS = [
  { dir: 'skills', match: (name) => name === 'SKILL.md', required: ['name', 'description'] },
  { dir: 'agents', match: (name) => name.endsWith('.md'), required: ['name', 'description'] },
];

/** A hook command touching one of these looks like it references a file. */
const SCRIPT_EXTENSIONS = /\.(mjs|cjs|js|ts|sh|bash|zsh|py|rb)\b/;
const RELATIVE_PATH = /(^|[\s"'=])\.{1,2}\//;
const PLUGIN_ROOT = '${CLAUDE_PLUGIN_ROOT}';

// ---------------------------------------------------------------- loading

function readJson(root, relPath) {
  const abs = join(root, relPath);
  if (!existsSync(abs)) return { path: relPath, error: 'missing file' };
  try {
    return { path: relPath, data: JSON.parse(readFileSync(abs, 'utf8')) };
  } catch (err) {
    return { path: relPath, error: `invalid JSON — ${err.message}` };
  }
}

function listDirs(abs) {
  if (!existsSync(abs)) return [];
  return readdirSync(abs, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort();
}

function* walk(abs) {
  if (!existsSync(abs)) return;
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const child = join(abs, entry.name);
    if (entry.isDirectory()) yield* walk(child);
    else if (entry.isFile()) yield child;
  }
}

/**
 * A marketplace entry may point at a local folder or at a remote repo
 * (a string like "owner/repo", or an object). Only local folders can be
 * checked on disk, so remote sources resolve to null and are skipped.
 */
function localDir(source) {
  if (typeof source !== 'string') return null;
  if (!source.startsWith('./') && !source.startsWith('../')) return null;
  return source.replace(/\/+$/, '');
}

function load(root) {
  const marketplace = readJson(root, MARKETPLACE_MANIFEST);
  const entries = Array.isArray(marketplace.data?.plugins) ? marketplace.data.plugins : [];

  const plugins = entries.map((entry, index) => {
    const dir = localDir(entry?.source);
    return {
      index,
      entry: entry ?? {},
      dir,
      manifest: dir ? readJson(root, join(dir, PLUGIN_MANIFEST)) : null,
      exists: dir ? existsSync(join(root, dir)) : false,
    };
  });

  return { root, marketplace, entries, plugins, dirsOnDisk: listDirs(join(root, PLUGINS_DIR)) };
}

// ----------------------------------------------------------------- checks

/** Both manifests parse, and the fields the marketplace cannot work without exist. */
function checkManifests({ marketplace, entries, plugins }) {
  const found = [];
  if (marketplace.error) {
    return [{ file: marketplace.path, message: marketplace.error }];
  }
  for (const field of ['name', 'owner', 'plugins']) {
    if (marketplace.data?.[field] === undefined) {
      found.push({ file: marketplace.path, message: `missing "${field}"` });
    }
  }
  if (!Array.isArray(marketplace.data?.plugins)) {
    found.push({ file: marketplace.path, message: '"plugins" must be an array' });
    return found;
  }
  entries.forEach((entry, index) => {
    for (const field of ['name', 'source', 'description', 'version']) {
      if (entry?.[field] === undefined) {
        found.push({ file: marketplace.path, message: `plugins[${index}] missing "${field}"` });
      }
    }
  });
  for (const plugin of plugins) {
    if (!plugin.manifest) continue; // remote source, nothing local to read
    if (plugin.manifest.error) {
      found.push({ file: plugin.manifest.path, message: plugin.manifest.error });
      continue;
    }
    for (const field of ['name', 'description', 'version']) {
      if (plugin.manifest.data?.[field] === undefined) {
        found.push({ file: plugin.manifest.path, message: `missing "${field}"` });
      }
    }
  }
  return found;
}

/** Every listed source resolves to a real folder. */
function checkSources({ marketplace, plugins }) {
  return plugins
    .filter((plugin) => plugin.dir && !plugin.exists)
    .map((plugin) => ({
      file: marketplace.path,
      message: `plugins[${plugin.index}] source "${plugin.entry.source}" points at no folder`,
    }));
}

/** The mistake you make most often: a plugin folder nobody listed. */
function checkUnlisted({ marketplace, plugins, dirsOnDisk }) {
  const listed = new Set(plugins.map((plugin) => plugin.dir && basename(plugin.dir)).filter(Boolean));
  return dirsOnDisk
    .filter((name) => !listed.has(name))
    .map((name) => ({
      file: marketplace.path,
      message: `${PLUGINS_DIR}/${name} exists on disk but is not listed in "plugins"`,
    }));
}

/** Names are unique, and name plus version agree across both manifests. */
function checkIdentity({ marketplace, plugins }) {
  const found = [];
  const seen = new Map();

  for (const plugin of plugins) {
    const name = plugin.entry.name;
    if (typeof name !== 'string') continue;
    if (seen.has(name)) {
      found.push({
        file: marketplace.path,
        message: `duplicate plugin name "${name}" (plugins[${seen.get(name)}] and plugins[${plugin.index}])`,
      });
    } else {
      seen.set(name, plugin.index);
    }
  }

  for (const plugin of plugins) {
    const local = plugin.manifest?.data;
    if (!local) continue;
    if (local.name !== undefined && local.name !== plugin.entry.name) {
      found.push({
        file: plugin.manifest.path,
        message: `name "${local.name}" differs from marketplace entry "${plugin.entry.name}"`,
      });
    }
    if (local.version !== undefined && local.version !== plugin.entry.version) {
      found.push({
        file: plugin.manifest.path,
        message: `version "${local.version}" differs from marketplace entry "${plugin.entry.version}"`,
      });
    }
  }
  return found;
}

/** Frontmatter without name or description means Claude Code ignores the file. */
export function frontmatter(text) {
  const block = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/.exec(text);
  if (!block) return null;
  const fields = {};
  // ponytail: top-level "key: value" only, which is all these files use.
  // Reach for a YAML parser the day frontmatter grows nested structures.
  for (const line of block[1].split(/\r?\n/)) {
    const pair = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (pair) fields[pair[1]] = pair[2].trim().replace(/^["']|["']$/g, '');
  }
  return fields;
}

function checkFrontmatter({ root, plugins }) {
  const found = [];
  for (const plugin of plugins) {
    if (!plugin.dir || !plugin.exists) continue;
    for (const target of FRONTMATTER_TARGETS) {
      for (const abs of walk(join(root, plugin.dir, target.dir))) {
        if (!target.match(basename(abs))) continue;
        const file = relative(root, abs).split(sep).join('/');
        const fields = frontmatter(readFileSync(abs, 'utf8'));
        if (!fields) {
          found.push({ file, message: 'no --- frontmatter block' });
          continue;
        }
        for (const field of target.required) {
          if (!fields[field]) found.push({ file, message: `frontmatter missing "${field}"` });
        }
      }
    }
  }
  return found;
}

/** Hook commands must resolve through ${CLAUDE_PLUGIN_ROOT}, never a relative path. */
function* commandStrings(node) {
  if (Array.isArray(node)) {
    for (const item of node) yield* commandStrings(item);
    return;
  }
  if (node && typeof node === 'object') {
    if (typeof node.command === 'string') yield node.command;
    for (const value of Object.values(node)) yield* commandStrings(value);
  }
}

function checkHookPaths({ root, plugins }) {
  const found = [];
  for (const plugin of plugins) {
    if (!plugin.dir || !plugin.exists) continue;

    const sources = [
      { path: plugin.manifest?.path, hooks: plugin.manifest?.data?.hooks },
      ...(existsSync(join(root, plugin.dir, 'hooks', 'hooks.json'))
        ? [(({ path, data }) => ({ path, hooks: data }))(readJson(root, join(plugin.dir, 'hooks', 'hooks.json')))]
        : []),
    ];

    for (const source of sources) {
      if (!source.hooks) continue;
      for (const command of commandStrings(source.hooks)) {
        if (command.includes(PLUGIN_ROOT)) continue;
        // ponytail: only flag commands that look like they reference a file —
        // an inline `jq`/`echo` hook needs no plugin root.
        if (!RELATIVE_PATH.test(command) && !SCRIPT_EXTENSIONS.test(command)) continue;
        found.push({
          file: source.path,
          message: `hook command must use ${PLUGIN_ROOT}: ${command}`,
        });
      }
    }
  }
  return found;
}

const CHECKS = [
  checkManifests,
  checkSources,
  checkUnlisted,
  checkIdentity,
  checkFrontmatter,
  checkHookPaths,
];

// -------------------------------------------------------------------- api

/** @returns {{file: string, message: string}[]} empty when the repo is valid */
export function validate(root = process.cwd()) {
  const ctx = load(root);
  return CHECKS.flatMap((check) => check(ctx));
}

function main(argv) {
  const root = argv[0] ? resolve(argv[0]) : process.cwd();
  const problems = validate(root);

  if (problems.length === 0) {
    const { plugins } = load(root);
    console.log(`ok — ${plugins.length} plugin(s) valid`);
    return 0;
  }

  console.error(`${problems.length} problem(s):\n`);
  for (const { file, message } of problems) console.error(`  ${file}: ${message}`);
  console.error('');
  return 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  process.exit(main(process.argv.slice(2)));
}
