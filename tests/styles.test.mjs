import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const css = await readFile(new URL('../dist/styles.css', import.meta.url), 'utf8');

const relativeLuminance = (hex) => hex
  .match(/[a-f\d]{2}/gi)
  .map((channel) => parseInt(channel, 16) / 255)
  .map((channel) => (
    channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  ))
  .reduce((sum, channel, index) => (
    sum + channel * [0.2126, 0.7152, 0.0722][index]
  ), 0);

const contrastRatio = (foreground, background) => {
  const values = [foreground, background]
    .map(relativeLuminance)
    .sort((left, right) => right - left);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

test('ships semantic widget color tokens without forcing black descendants', () => {
  for (const token of [
    '--asw-background',
    '--asw-surface',
    '--asw-text',
    '--asw-accent',
    '--asw-accent-text',
    '--asw-header-control-background',
    '--asw-select-background',
    '--asw-select-text',
    '--asw-stepper-background',
  ]) {
    assert.match(css, new RegExp(token));
  }

  assert.doesNotMatch(css, /\.asw-menu \*\s*\{[^}]*color:\s*#000\s*!important/);
});

test('supports explicit host themes and a system dark fallback', () => {
  assert.match(css, /html\[data-asw-theme=dark\] \.asw-menu/);
  assert.match(css, /html\[data-pd-theme=dark\] \.asw-menu/);
  assert.match(css, /prefers-color-scheme:\s*dark/);
  assert.match(css, /data-asw-theme=light/);
  assert.match(css, /data-pd-theme=light/);
});

test('owns the stable panel geometry instead of requiring a host override', () => {
  assert.match(css, /overflow-x:\s*hidden/);
  assert.match(css, /overflow-y:\s*auto/);
  assert.match(css, /max-height:\s*calc\(100vh\s*-\s*55px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test('dark text and icon pairs meet WCAG AA', () => {
  assert.ok(contrastRatio('#f1f3f5', '#387590') >= 4.5);
  assert.ok(contrastRatio('#f1f3f5', '#3e5665') >= 4.5);
  assert.ok(contrastRatio('#252f34', '#66c4eb') >= 4.5);
});
