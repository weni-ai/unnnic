// Ship SCSS tokens inside dist/ so consumers can import them without publishing
// the rest of src/ (stories, emoji, fonts, media). Only dist/ is published, so
// the token SCSS is mirrored here for the ./scss/unnnic.scss package export.
import { cpSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

cpSync(resolve(root, 'src/assets/scss'), resolve(root, 'dist/scss'), {
  recursive: true,
});
