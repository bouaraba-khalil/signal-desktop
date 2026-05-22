/// <reference types="vite/client" />

import type { electronAPI, electronEvents } from "../preload";

declare global {
  interface Window {
    electronAPI: typeof electronAPI;
    electronEvents: typeof electronEvents;
  }
}
