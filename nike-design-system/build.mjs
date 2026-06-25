// Deterministic build: esbuild bundles the library to dist/index.js (ESM) and
// collects every component's imported CSS into dist/index.css. React is external
// so consumers (and Claude Design's bundle) provide their own copy.
import esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  sourcemap: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  loader: { '.css': 'css' },
  logLevel: 'info',
});

console.log('✓ built dist/index.js and dist/index.css');
