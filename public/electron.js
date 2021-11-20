const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const { ipcMain } = require("electron");

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    titleBarStyle: "hidden-inset",
    width: 900,
    height: 680,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.setMenu(null);
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("closeApp", (error, data) => {
  app.quit();
});
ipcMain.on("minimizeApp", (error, data) => {
  mainWindow.minimize();
});
ipcMain.on("maximizeApp", (error, data) => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
