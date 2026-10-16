import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
execFileSync(process.execPath, ['scripts/build-homepage.mjs', '--check'], { cwd: root, stdio: 'inherit' });
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate document IDs');
for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (value.startsWith('#')) assert.ok(ids.includes(value.slice(1)), `Broken anchor: ${value}`);
  else if (/^(https:|mailto:)/.test(value)) new URL(value.replaceAll('&amp;', '&'));
  else assert.ok(existsSync(resolve(root, value)), `Missing asset: ${value}`);
}
for (const file of ['publications.json', 'collaborations.json']) {
  const works = JSON.parse(readFileSync(resolve(root, 'content', file), 'utf8'));
  for (const work of works) {
    assert.ok(work.title && Object.keys(work.links).length, `Incomplete work: ${work.id}`);
    assert.ok(work.authors.length || work.type === 'Under review', `Missing authors: ${work.id}`);
    assert.ok(work.year || work.type === 'Under review', `Missing year: ${work.id}`);
  }
}
assert.ok(!html.includes('GitHub University'), 'Template CV content leaked into the homepage');
assert.ok(!html.includes('Candidate'), 'Use the confirmed Ph.D. Student designation');
assert.ok(existsSync(resolve(root, '.nojekyll')), 'Static Pages publishing requires .nojekyll');
console.log('Homepage checks passed: content, local assets, anchors, and publication metadata.');
