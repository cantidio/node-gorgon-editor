#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawnSync;
const rimraf = require('rimraf');

const srcPath = path.join(__dirname, '../dist');
const dstPath = path.join(__dirname, '../.gh-pages');
const token = process.env.GH_TOKEN;
const repo = 'github.com/cantidio/node-gorgon-editor.git';
const url = `https://${token}@${repo}`;

function exec(cmd, cwd) {
  const args = cmd.split(' ');
  const proc = args.shift();

  spawn(proc, args, { cwd: cwd });
}

function copy(srcPath, dstPath) {
  const files = fs.readdirSync(srcPath);
  files.forEach((file) => {
    exec(`cp ${path.join(srcPath, file)} ${dstPath}/`);
  });
}

console.log('gh-pages:publish:start');
try {
  rimraf.sync(dstPath);
  exec(`git clone -q -b gh-pages ${url} ${dstPath}`);
  exec('git config user.name Travis-CI', dstPath);
  exec('git config user.email aniquilatorbloody@gmail.com', dstPath);
  exec('git rm *', dstPath);
  copy(srcPath, dstPath);
  exec('git add *', dstPath);
  exec('git commit -m gh-pages:publish', dstPath);
  exec('git push -q -u origin gh-pages', dstPath);
} catch (e) {
  console.log('gh-pages:publish:error');
  process.exit(1);
}

console.log('gh-pages:publish:done');
