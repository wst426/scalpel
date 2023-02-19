import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld('api', {
  loadDir: (path: string) => ipcRenderer.send('loadDir', path),
  handleData: (callback: (event: IpcRendererEvent, data: Data) => void) => ipcRenderer.on('onData', callback)
});
