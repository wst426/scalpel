import esbuild from "esbuild";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { copyFile } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await esbuild.build({
  entryPoints: [ 'main/index.ts' ],
  outfile: 'dist/main.js',
  bundle: true,
  minify: false,
  sourcemap: 'linked',
  platform: 'node',
  format: 'cjs',
  external: [ 'electron' ],
});

await esbuild.build({
  entryPoints: [ 'preload/index.ts' ],
  outfile: 'dist/preload.js',
  bundle: true,
  minify: true,
  sourcemap: 'linked',
  platform: 'node',
  format: 'cjs',
  external: [ 'electron' ],
});

await esbuild.build({
  entryPoints: [ 'renderer/index.ts' ],
  outfile: 'dist/renderer.js',
  bundle: true,
  minify: true,
  sourcemap: 'linked',
  platform: 'browser',
  format: 'iife',
});

await copyFile(path.join(__dirname, 'static', 'index.html'), path.join(__dirname, 'dist', 'index.html'));
