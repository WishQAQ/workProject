/**
 * Created by jahv on 2017/6/26.
 */
import config from "../config";

let win = null;
let windows = [];
let createWindows = null;

if (config.dev) {
  createWindows = function (newOpen) {
    if (win === null || newOpen) {
      const {BrowserWindow} = require('electron')
      win = new BrowserWindow({width: 536, height: 374, frame: config.dev});
      if (config.dev === false) win.hide();
      win.webContents.setUserAgent(`Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36 OAK/1.0 (win=${win.id})`);
      win.center();
      win.setMinimumSize(536, 374);
      win.loadURL(`http://${config.host}:${config.port}`);
      win.setMenuBarVisibility(false);
      if (config.dev === true) {
        setTimeout(function () {
          win.toggleDevTools();
        }, 2000)
      }
      win.on('closed', () => {
        win = null
      });
      windows[win.id] = win;
    }
    return win;
  }
} else {
  const w = require('../../default_app.asar/windows');
  win = w.main;
  windows = w.windows;
  let baseUrl = `http://${config.host}:${config.port}`;
  createWindows = function (newOpen) {
    if (w.main === null || newOpen) {
      console.log(`open window: ${baseUrl}`);
      win = w.createWindows(baseUrl);
    } else {
      console.log(`main window is open`);
      win = w.main
      let url = win.webContents.getURL()
      console.log(`url is: ${url}`);
      if (!url.startsWith(baseUrl)) {
        console.log(`load url: ${baseUrl}`);
        win.webContents.loadURL(baseUrl);
      }
    }
  };
}

export {win, createWindows, windows}