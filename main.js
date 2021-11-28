const { app, BrowserWindow, globalShortcut } = require('electron');
global.GetServerFile = require('./src/classes/getServerFile.js').GetServerFile;
global.ConfigSetting = require('./src/classes/configSetting.js').ConfigSetting;
global.DownloadFile = require('./src/classes/downloadFile.js').DownloadFile;

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
    win.loadURL(`file:///${__dirname}/build/index.html`);

    return win;
}

app.on("ready", () => {
    var win = createWindow();

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        BrowserWindow.getFocusedWindow().webContents.openDevTools();
    });
});