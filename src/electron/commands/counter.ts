import { ELECTRON_EMITTERS } from "@shared/events";

import { emitterFactory } from ".";

import type { BrowserWindow } from "electron";

export function counterCommand(bw: BrowserWindow) {
  let count = 0;
  const emit = emitterFactory(bw);

  setInterval(() => {
    emit(ELECTRON_EMITTERS.TEST, count);
    count++;
  }, 1000);
}
