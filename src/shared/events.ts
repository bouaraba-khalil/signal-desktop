export const ELECTRON_LISTENERS = {
  SUBMIT: "submit",
} as const;

export const ELECTRON_EMITTERS = {
  TEST: "test",
  SUBMIT_STATUS: "submit_status",
} as const;

export const RENDERER_LISTENERS = ELECTRON_EMITTERS;
export const RENDERER_EMITTERS = ELECTRON_LISTENERS;
