import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const js = await readFile(new URL('../dist/sienna.min.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../dist/styles.css', import.meta.url), 'utf8');

test('exposes the panel as a named modal dialog', () => {
  assert.match(js, /role=\\?"dialog\\?"/);
  assert.match(js, /aria-modal=\\?"true\\?"/);
  assert.match(js, /aria-labelledby=\\?"asw-menu-title\\?"/);
});

test('keeps the open state and toggle states in sync for assistive technology', () => {
  assert.match(js, /aria-expanded/);
  assert.match(js, /aria-controls/);
  assert.match(js, /aria-pressed/);
});

test('makes header controls reachable and operable by keyboard', () => {
  assert.match(js, /asw-menu-reset\\?" title=\\?"Reset settings\\?" tabindex=\\?"0\\?"/);
  assert.match(js, /asw-menu-close\\?" title=\\?"Close\\?" tabindex=\\?"0\\?"/);
  assert.match(js, /Escape/);
});

test('shows a visible focus indicator on panel controls', () => {
  assert.match(css, /\.asw-select:focus-visible/);
  assert.match(css, /outline:\s*3px solid/);
});
