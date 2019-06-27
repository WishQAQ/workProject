

const {app, BrowserWindow} = require('electron');
const config = require('../config.json');
const {default: electronDevtoolsInstaller, REACT_DEVELOPER_TOOLS} = require('electron-devtools-installer');
const debug = require('debug');
debug.enable('*');
const log = debug('主要');

app.commandLine.appendSwitch('remote-debugging-port', '9229');

let win;

function createWindow() {
    electronDevtoolsInstaller(REACT_DEVELOPER_TOOLS).then(function () {
        win = new BrowserWindow({
            width: config.window.minWidth,
            height: config.window.minHeight,
            frame: false,
            minHeight: config.window.minHeight,
            minWidth: config.window.minWidth,
            backgroundColor: '#fff'
        });
        win.loadURL('http://127.0.0.1:' + config.dev.main.port);
        win.show();
        win.center();
        win.focus();
        // 清空数据
        win.webContents.session.clearStorageData();
        log('创建窗口: %d', win.id);
    }).catch(function (e) {
        throw new Error('安装react开发者工具失败,' + e);
    });

}

app.on('ready', createWindow);

