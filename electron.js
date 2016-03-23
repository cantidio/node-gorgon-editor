'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'prod';
process.env.ELECTRON = true;

var electron = require('electron');
var isProd = process.env.NODE_ENV === 'prod';
var devURL = 'http://localhost:3000';
var prodURL = 'file://' + __dirname + '/../dist/index.html';
var mainURL = isProd ? prodURL : devURL;
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  //FIXME: When in development mode, should check if the url is ready
  mainWindow.loadURL(mainURL);
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
