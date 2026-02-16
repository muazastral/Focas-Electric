/**
 * Post-build script: copies frontend public/ assets to backend/public/
 * so static files (e.g. /pdf-catalog/...) are served at the root path.
 */
import { cpSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const src = resolve(ROOT, 'public');
const dest = resolve(ROOT, 'backend', 'public');

if (existsSync(src)) {
  cpSync(src, dest, { recursive: true, force: true });
  console.log(`✓ Copied public/ assets to backend/public/`);
} else {
  console.log('⚠ No public/ directory found, skipping asset copy.');
}
