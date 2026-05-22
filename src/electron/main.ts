import { app, BrowserWindow, screen } from "electron";
import started from "electron-squirrel-startup";
import path from "node:path";

import { startCommand } from "./commands";
import isDev from "./packages/is-dev";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    width,
    height,
    frame: false,
    fullscreenable: true,
    maximizable: true,
    minimizable: true,
    resizable: true,
    titleBarStyle: "hidden",
    trafficLightPosition: {
      x: 10,
      y: 10,
    },
    titleBarOverlay: {
      color: "#18181b",
      symbolColor: "#EEEEEE",
      height: 28,
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    darkTheme: true,
  });
  // @ts-expect-error Vite is not a module
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // @ts-expect-error Vite is not a module
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      // @ts-expect-error Vite is not a module
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools on development
  if (isDev) mainWindow.webContents.openDevTools({ mode: "left" });
  // block devtools from opening on production
  else {
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });

    mainWindow.webContents.on("before-input-event", (event, input) => {
      const key = input.key.toLowerCase();
      const commandOrControl = input.control || input.meta;
      const blocked =
        // block devtools shortcuts
        key === "f12" ||
        (commandOrControl && input.shift && ["i", "j", "c"].includes(key)) ||
        // block close and quit shortcuts
        (commandOrControl && ["q", "w"].includes(key)) ||
        (input.alt && key === "f4") ||
        // block reload shortcuts
        (commandOrControl && key === "r") ||
        key === "f5" ||
        // block browser navigation shortcuts
        (input.alt && ["arrowleft", "arrowright", "backspace"].includes(key)) ||
        // block zoom shortcuts
        (commandOrControl && ["+", "-", "=", "0"].includes(key)) ||
        // block browser/file shortcuts
        (commandOrControl && ["l", "o", "p", "s", "u"].includes(key));

      if (blocked) {
        event.preventDefault();
      }
    });
  }

  startCommand(mainWindow);
}

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on("ready", createWindow);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on("second-instance", () => {
    if (BrowserWindow.getAllWindows().length > 0) {
      if (BrowserWindow.getAllWindows()[0].isMinimized())
        BrowserWindow.getAllWindows()[0].restore();
      BrowserWindow.getAllWindows()[0].focus();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
}
