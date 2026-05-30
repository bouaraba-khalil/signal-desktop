/// <reference types="vite/client" />

import type { listeners, emitters } from "../preload";

declare global {
  interface Window {
    listeners: typeof listeners;
    emitters: typeof emitters;
  }
}
