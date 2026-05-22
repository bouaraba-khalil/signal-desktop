import type { BrowserWindow } from "electron";

export function startCommand(mainWindow: BrowserWindow) {
  let count = 0;
  setInterval(() => {
    mainWindow.webContents.send("test", count);
    count++;
  }, 1000);
}
