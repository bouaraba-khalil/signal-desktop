/// <reference types="vite/client" />

import type { listeners, emitters } from "../preload";

declare global {
  interface Window {
    electronListeners: typeof listeners;
    electronEmitters: typeof emitters;
  }
}
