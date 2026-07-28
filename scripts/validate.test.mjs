import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from './validate.mjs';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL = '---\nname: demo\ndescription: One line.\n---\nbody\n';

/** A valid single-plugin marketplace, as a mutable file map. */
const base = () => ({
  '.claude-plugin/marketplace.json': {
    name: 'fixture',
    owner: { name: 'o' },
    plugins: [{ name: 'core', source: './plugins/core', description: 'd', version: '0.1.0' }],
  },
  'plugins/core/.claude-plugin/plugin.json': { name: 'core', description: 'd', version: '0.1.0' },
  'plugins/core/skills/demo/SKILL.md': SKILL,
});

function problems(t, files) {
  const root = mkdtempSync(join(tmpdir(), 'marketplace-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const [rel, body] of Object.entries(files)) {
    const abs = join(root, rel);
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, typeof body === 'string' ? body : JSON.stringify(body, null, 2));
  }
  return validate(root).map((p) => `${p.file}: ${p.message}`);
}

const hooked = (command) => {
  const files = base();
  files['plugins/core/.claude-plugin/plugin.json'] = {
    name: 'core',
    description: 'd',
    version: '0.1.0',
    hooks: { SessionStart: [{ hooks: [{ type: 'command', command }] }] },
  };
  return files;
};

test('this repository is valid', () => {
  assert.deepEqual(validate(REPO_ROOT), []);
});

test('a valid fixture reports nothing', (t) => {
  assert.deepEqual(problems(t, base()), []);
});

test('broken JSON in a manifest', (t) => {
  const files = base();
  files['plugins/core/.claude-plugin/plugin.json'] = '{ not json';
  assert.match(problems(t, files).join('\n'), /invalid JSON/);
});

test('source pointing at no folder', (t) => {
  const files = base();
  files['.claude-plugin/marketplace.json'].plugins[0].source = './plugins/gone';
  assert.match(problems(t, files).join('\n'), /points at no folder/);
});

test('plugin folder missing from the marketplace', (t) => {
  const files = base();
  files['plugins/frontend/.claude-plugin/plugin.json'] = { name: 'frontend', description: 'd', version: '0.1.0' };
  assert.match(problems(t, files).join('\n'), /plugins\/frontend exists on disk/);
});

test('duplicate plugin names', (t) => {
  const files = base();
  files['.claude-plugin/marketplace.json'].plugins.push({
    name: 'core',
    source: './plugins/core',
    description: 'd',
    version: '0.1.0',
  });
  assert.match(problems(t, files).join('\n'), /duplicate plugin name "core"/);
});

test('version drifting between the two manifests', (t) => {
  const files = base();
  files['plugins/core/.claude-plugin/plugin.json'].version = '0.2.0';
  assert.match(problems(t, files).join('\n'), /version "0.2.0" differs/);
});

test('frontmatter missing a required field', (t) => {
  const files = base();
  files['plugins/core/skills/demo/SKILL.md'] = '---\nname: demo\n---\nbody\n';
  files['plugins/core/agents/scout.md'] = 'no frontmatter at all\n';
  const found = problems(t, files).join('\n');
  assert.match(found, /SKILL.md: frontmatter missing "description"/);
  assert.match(found, /scout.md: no --- frontmatter block/);
});

test('hook commands need ${CLAUDE_PLUGIN_ROOT}', (t) => {
  assert.match(problems(t, hooked('node scripts/on-start.mjs')).join('\n'), /must use \$\{CLAUDE_PLUGIN_ROOT\}/);
  assert.deepEqual(problems(t, hooked('node "${CLAUDE_PLUGIN_ROOT}/scripts/on-start.mjs"')), []);
  assert.deepEqual(problems(t, hooked('echo hello')), []);
});

test('hooks.json is checked as well as plugin.json', (t) => {
  const files = base();
  files['plugins/core/hooks/hooks.json'] = { SessionStart: [{ hooks: [{ type: 'command', command: './scripts/go.sh' }] }] };
  assert.match(problems(t, files).join('\n'), /hooks\/hooks.json: hook command must use/);
});
