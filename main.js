require('./app/routes/route');

const { powerSaveBlocker } = require('electron')
const electron = require('electron')
const isDev = require("electron-is-dev");
const database = require('./app/lib/database');
const autoUpdater = require('./app/config/autoupdater');
const app_config = require('./app/config/app.config');
const path = require("path");

const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const Tray = electron.Tray;
// initialize ejs parser

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
// this part is for autoupdater
const iconpath = path.join(__dirname, './icon/icon.ico')

const menu = new Menu();
menu.append(new MenuItem({ label: 'Updater', click() { autoUpdater.checkForUpdates() } }));
Menu.setApplicationMenu(menu);

setTimeout(function() {
    console.log('---go to sleep---')
    const id = powerSaveBlocker.start('prevent-app-suspension')
    console.log(powerSaveBlocker.isStarted(id))
}, 5000)
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    createWindow();

    // Access electrons autoUpdater
    if (isDev) {
        console.log('Development environment. No need to check for updates');
    } else {
        autoUpdater.checkForUpdates();
    }
});
// check auto update when app is ready

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


let createWindow = function () {
    // Create the browser window.
    mainWindow = new BrowserWindow(app_config.window_size);
    mainWindow.loadURL("http://" + app_config.host + ":" + app_config.port);
    mainWindow.focus();

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    let appIcon = configTray();
    
    mainWindow.on('close', function (event) {
        mainWindow = null;
        database.closeConnection();
    
    })
    mainWindow.on('minimize', function (event) {
        event.preventDefault()
        mainWindow.hide();
    })
    mainWindow.on('show', function () {
        appIcon.setHighlightMode('always')
    })
};

let configTray = function(){
    let appIcon = new Tray(iconpath);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: function () {
                mainWindow.show();
            }
        },
        {
            label: 'Quit', click: function () {
                app.isQuiting = true;
                app.quit();

            }
        }
    ]);
    appIcon.setContextMenu(contextMenu);
    return appIcon;    
}


