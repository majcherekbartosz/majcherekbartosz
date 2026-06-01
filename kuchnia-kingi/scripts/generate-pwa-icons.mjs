/**
 * Regenerates PNG PWA icons from SVG sources.
 * Requires: npm install -D sharp
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const icon = readFileSync(join(root, 'public/icons/icon.svg'));
const maskable = readFileSync(join(root, 'public/icons/icon-maskable.svg'));
const out = join(root, 'public/icons');

await sharp(icon).resize(192, 192).png().toFile(join(out, 'icon-192.png'));
await sharp(icon).resize(512, 512).png().toFile(join(out, 'icon-512.png'));
await sharp(maskable).resize(512, 512).png().toFile(join(out, 'icon-maskable-512.png'));
await sharp(icon).resize(180, 180).png().toFile(join(out, 'apple-touch-icon.png'));

console.log('PWA icons written to public/icons/');
