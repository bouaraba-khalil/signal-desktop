import { contextBridge, ipcRenderer } from "electron";

export const electronAPI = {
  onTest: (callback: (value: number) => void) => {
    const listener = (_: unknown, value: number) => callback(value);
    ipcRenderer.on("test", listener);
    return () => {
      ipcRenderer.off("test", listener);
    };
  },
};
export const electronEvents = {};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
contextBridge.exposeInMainWorld("electronEvents", electronEvents);
