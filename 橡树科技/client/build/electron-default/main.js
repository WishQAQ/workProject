const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const express = require('express');
const proxy = require('proxy-middleware');
const url = require('url');
const local = express();

let win;
let config = null;

if (fs.existsSync("./config.json")) {
    let debug = fs.readFileSync("./config.json").toString();
    debug = debug.replace(/\s\/\/.*\s/g, "");
    config = JSON.parse(debug);
} else {
    config = {};
}

local.use(express.static(__dirname + '/public'));

local.get("/command", function (req, res) {
    let command = req.url.split("?")[1];
    if (command) {
        command = decodeURIComponent(command);
        let commands = command.split(";");
        commands.forEach(command => {
            let val = eval("(win." + command + ")");
            if (val) res.send("" + val);
        })
    }
});

local.use(express.static(__dirname + '/public'));
local.use("/res", express.static(__dirname + '/public'));

local.use('/api', proxy(url.parse(`http://${config['server_host'] || "127.0.0.1:8080"}/`)));

local.listen(8090);

function createWindow() {
    win = new BrowserWindow({width: 536, height: 374, frame: false});
    win.center();
    win.setMinimumSize(536, 374);
    win.loadURL('http://localhost:8090');
    win.setMenuBarVisibility(false);
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});