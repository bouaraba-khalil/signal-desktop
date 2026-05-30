import { ipcMain, type BrowserWindow } from "electron";

import { counterCommand } from "./counter";
import { submitCommand } from "./submit";

export function listenerFactory() {
  return (channel: string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any) =>
    ipcMain.handle(channel, listener);
}

export function emitterFactory(bw: BrowserWindow) {
  return (event: string, ...args: any[]) => bw.webContents.send(event, ...args);
}

export function startCommand(bw: BrowserWindow) {
  counterCommand(bw);
  submitCommand(bw);
}
