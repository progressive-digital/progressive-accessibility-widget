import { stat, unlink } from 'node:fs/promises';

const output = new URL('../dist/styles.min.js', import.meta.url);

try {
  const file = await stat(output);
  if (file.size !== 0) {
    throw new Error('Refusing to remove a non-empty styles.min.js build artifact.');
  }
  await unlink(output);
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error;
  }
}
