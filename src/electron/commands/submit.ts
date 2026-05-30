import { ELECTRON_EMITTERS, ELECTRON_LISTENERS } from "@shared/events";

import { emitterFactory, listenerFactory } from ".";

import type { BrowserWindow } from "electron";

export function submitCommand(bw: BrowserWindow) {
  const listen = listenerFactory();
  const emit = emitterFactory(bw);

  listen(ELECTRON_LISTENERS.SUBMIT, async (_event, { file, test }) => {
    console.log(file, test);
    emit(ELECTRON_EMITTERS.SUBMIT_STATUS, { file, test });
    return { success: true };
  });
}
