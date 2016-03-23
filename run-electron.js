#!/usr/bin/env node
'use strict';

var electronPath = require('electron-prebuilt');
var spawn = require('child_process').spawn;

var args = process.argv.slice(2);
args.unshift(__dirname + '/../');

spawn(electronPath, args, {
  stdio: 'inherit'
});
