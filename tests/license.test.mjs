import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const license = await readFile(new URL('../LICENSE', import.meta.url), 'utf8');
const packageMetadata = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
);

test('retains the canonical Sienna MIT license and copyright', () => {
  assert.equal(packageMetadata.license, 'MIT');
  assert.equal(packageMetadata.author, 'Benny Luk');
  assert.match(license, /^Copyright 2025 Benny Luk$/m);
  assert.match(license, /Permission is hereby granted, free of charge/);
  assert.match(license, /The above copyright notice and this permission notice/);
  assert.doesNotMatch(license, /GNU GENERAL PUBLIC LICENSE/);
});
