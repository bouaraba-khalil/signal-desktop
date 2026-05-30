import { ELECTRON_EMITTERS, ELECTRON_LISTENERS } from "@shared/events";

import { emitterFactory, listenerFactory } from ".";

import type { BrowserWindow } from "electron";

export function submitCommand(bw: BrowserWindow) {
  const listen = listenerFactory();
  const emit = emitterFactory(bw);

  listen(ELECTRON_LISTENERS.SUBMIT, async (_event, { content, test }) => {
    emit(ELECTRON_EMITTERS.SUBMIT_STATUS, { type: "status", message: "running" });
    emit(ELECTRON_EMITTERS.SUBMIT_STATUS, { type: "output", message: { content, test } });
    return { success: true };
  });
}
