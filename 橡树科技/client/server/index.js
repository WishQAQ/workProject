import config from "./config";
import {Server} from './component/server';
// import './component/socket.io'
// import "./component/command";
if (config.dev) {
  let {win, createWindows} = require('./component/window')
  let {app, globalShortcut} = require('electron')

  app.on('ready', createWindows);

  app.on('window-all-closed', () => {
    app.quit();
    process.exit(0);
  });

  app.on('will-quit', function () {
    globalShortcut.unregisterAll();
  });

  app.on('activate', () => {
    if (win === null) {
      createWindows()
    }
  });
}
Server.listen(config.port);