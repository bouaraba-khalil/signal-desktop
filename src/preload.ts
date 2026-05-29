import { contextBridge, ipcRenderer } from "electron";

export const listeners = {
  onTest: (callback: (value: number) => void) => {
    const listener = (_: unknown, value: number) => callback(value);
    ipcRenderer.on("test", listener);
    return () => {
      ipcRenderer.off("test", listener);
    };
  },
};
export const emitters = {};

contextBridge.exposeInMainWorld("electronListeners", listeners);
contextBridge.exposeInMainWorld("electronEmitters", emitters);
