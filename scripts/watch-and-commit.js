#!/usr/bin/env node
const chokidar = require('chokidar');
const simpleGit = require('simple-git');
const path = require('path');
const git = simpleGit(path.resolve(__dirname, '..'));
const watcher = chokidar.watch(['**/*', '!node_modules', '!.git'], {
  ignored: /node_modules|\.git/,
  persistent: true,
});
let busy = false;
console.log('Autosave watcher started: will auto-commit and push changes.');
async function commitAndPush() {
  if (busy) return;
  busy = true;
  try {
    await git.add('./*');
    const status = await git.status();
    if (status.staged.length === 0) {
      busy = false;
      return;
    }
    const message = 'Autosave: update ' + new Date().toISOString();
    await git.commit(message);
    await git.push('origin', 'import/gonme-standalone');
    console.log('Autosave: committed and pushed.');
  } catch (e) {
    console.error('Autosave error:', e.message || e);
  } finally {
    busy = false;
  }
}
const debounced = (() => {
  let t;
  return () => {
    clearTimeout(t);
    t = setTimeout(commitAndPush, 1000);
  };
})();
watcher.on('change', (p) => {
  console.log('File changed:', p);
  debounced();
});
watcher.on('add', (p) => {
  console.log('File added:', p);
  debounced();
});
