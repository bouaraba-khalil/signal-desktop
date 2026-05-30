// oxlint-disable-next-line no-unused-vars
import { ELECTRON_EMITTERS, ELECTRON_LISTENERS } from "@shared/events";
import { contextBridge, ipcRenderer } from "electron";

export const listeners = {
  [ELECTRON_EMITTERS.TEST]: (callback: (value: number) => void) => {
    const listener = (_: unknown, value: number) => callback(value);
    ipcRenderer.on(ELECTRON_EMITTERS.TEST, listener);
    return () => {
      ipcRenderer.off(ELECTRON_EMITTERS.TEST, listener);
    };
  },
  [ELECTRON_EMITTERS.SUBMIT_STATUS]: (
    callback: (value: { file: string; test: string }) => void,
  ) => {
    const listener = (_: unknown, value: { file: string; test: string }) => callback(value);
    ipcRenderer.on(ELECTRON_EMITTERS.SUBMIT_STATUS, listener);
    return () => {
      ipcRenderer.off(ELECTRON_EMITTERS.SUBMIT_STATUS, listener);
    };
  },
};
export const emitters = {
  [ELECTRON_LISTENERS.SUBMIT]: async ({ content, test }: { content: string; test: string }) =>
    await ipcRenderer.invoke(ELECTRON_LISTENERS.SUBMIT, { content, test }),
};

contextBridge.exposeInMainWorld("listeners", listeners);
contextBridge.exposeInMainWorld("emitters", emitters);
