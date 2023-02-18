import { contextBridge } from "electron";

contextBridge.exposeInMainWorld('api', {
  nodeVersion: process.versions.node,
  chromeVersion: process.versions.chrome,
  electronVersion: process.versions.electron,
});
