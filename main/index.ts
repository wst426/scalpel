import path from "node:path";
import { app, BrowserWindow, ipcMain, IpcMainEvent } from "electron";

function onLoadDir(window: BrowserWindow) {
  return (event: IpcMainEvent, path: string) => {
    const data: Data = {
      path: path,
      nodes: [
        { index: 0, name: 'a' },
        { index: 1, name: 'b' },
        { index: 2, name: 'c' },
      ],
      edges: [
        { source: 1, target: 2 },
        { source: 0, target: 1 },
      ]
    };
    window.webContents.send('onData', data);
  }
}

function createWindow() {
  const window = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  window.maximize();
  window.loadFile('index.html');
  ipcMain.on('loadDir', onLoadDir(window));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
