const { app, BrowserWindow, globalShortcut } = require('electron');
const remoteMain = require('@electron/remote/main');

remoteMain.initialize();

global.events = new (require("events")).EventEmitter();
require("./src/js/globalVar.js");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    win.removeMenu();
    win.webContents.openDevTools();
    if (process.env.NODE_ENV === 'development') {
        win.loadURL(`file:///${__dirname}/build/index.html`);
    } else {
        win.loadURL("http://localhost:3000");
    }
    remoteMain.enable(win.webContents);

    return win;
}

app.on("ready", () => {
    var win = createWindow();

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        BrowserWindow.getFocusedWindow().webContents.openDevTools();
    });
});