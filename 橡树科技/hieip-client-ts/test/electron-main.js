const {app, BrowserWindow, globalShortcut} = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
let config = {
    "window": {
        "minWidth": 536,
        "minHeight": 374
    }
};
let home = process.env.HOME || process.env.USERPROFILE || `${process.env.HOMEDRIVE}${process.env.HOMEPATH}`;
let configPath = path.join(home, '.hieip/config.json');
let packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')));
if (fs.existsSync(configPath)) {
    config = require(configPath);
} else {
    config.version = packageJson.version;
    if (!fs.existsSync(path.join(configPath, '..'))) fs.mkdirSync(path.join(configPath, '..'));
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
}

app.commandLine.appendSwitch('remote-debugging-port', '9229');

const types = {
    ".css": "text/css",
    ".gif": "image/gif",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript",
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".swf": "application/x-shockwave-flash",
    ".tiff": "image/tiff",
    ".ttf": "application/x-font-ttf",
    ".woff": "application/x-font-woff",
    ".txt": "text/plain",
    ".wav": "audio/x-wav",
    ".wma": "audio/x-ms-wma",
    ".wmv": "video/x-ms-wmv",
    ".xml": "text/xml"
};

let server, win;

const taskList = [
    new Promise(resolve => {
        app.on('ready', resolve);
    }),
    new Promise(resolve => {
        server = http.createServer((request, response) => {
            if (fs.existsSync(path.join(__dirname, request.url))) {
                let contentType = types[path.extname(request.url) || '.txt'];
                if (!contentType) console.warn(`${request.url} not find type!`);
                response.writeHead(200, {'Content-Type': contentType || 'text/plain'});
                fs.createReadStream(path.join(__dirname, request.url)).pipe(response)
            } else {
                response.writeHead(404);
                response.end('404 本地程序错误，请联系管理员！')
            }
        }).listen(0).on('listening', function () {
            resolve()
        })
    })
];

function createWindow() {
    win = new BrowserWindow({
        width: config.window.minWidth,
        height: config.window.minHeight,
        frame: false,
        minHeight: config.window.minHeight,
        minWidth: config.window.minWidth,
        backgroundColor: '#fff',
    });
    win.hide();
    if (config.version !== packageJson.version) {
        config.version = packageJson.version;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        win.webContents.session.clearStorageData();
    }
    win.loadURL(`http://127.0.0.1:${server.address().port}/index.html`);
    win.center();
    win.focus();

    globalShortcut.register('CommandOrControl+7+4+2+1', () => {
        win.webContents.openDevTools({mode: 'undocked'})
    });

    setTimeout(() => win.show(), 2300)
}

Promise.all(taskList).then(createWindow);

app.on('window-all-closed', () => {
    app.quit()
});
