const { app, BrowserWindow, globalShortcut } = require('electron');
global.GetServerFile = require('./assets/classes/getServerFile.js').GetServerFile;
global.ConfigSetting = require('./assets/classes/configSetting.js').ConfigSetting;
global.DownloadFile = require('./assets/classes/downloadFile.js').DownloadFile;

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
    win.loadFile('index.html');

    return win;
}

app.on("ready", () => {
    var win = createWindow();

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        BrowserWindow.getFocusedWindow().webContents.openDevTools();
    });
});