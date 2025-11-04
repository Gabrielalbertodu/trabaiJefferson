#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const strip = require('strip-comments');

const root = path.resolve(__dirname, '..');

const patterns = [
  '**/*.ts',
  '**/*.tsx',
  '**/*.js',
  '**/*.jsx',
  '**/*.css',
  '**/*.cjs',
  '**/*.html'
];

function processFile(file) {
  if (file.includes('node_modules') || file.includes('.git')) return;
  const full = path.join(root, file);
  let content = fs.readFileSync(full, 'utf8');
  if (/\.html?$/.test(full)) {
    content = content.replace(/<!--([\s\S]*?)-->/g, '');
  } else {
    try {
      content = strip(content, {safe: true});
    } catch (e) {
      content = content.replace(/\/\*[\s\S]*?\*\//g, '');
      content = content.replace(/(^|[^:])\/\/.*$/gm, '$1');
    }
  }
  content = content.replace(/[ \t]+$/gm, '');
  fs.writeFileSync(full, content, 'utf8');
  console.log('Stripped comments:', file);
}
(async () => {
  for (const pattern of patterns) {
    const files = glob.sync(pattern, {cwd: root, nodir: true, absolute: false});
    for (const f of files) processFile(f);
  }
  console.log('Done removing comments.');
})();
