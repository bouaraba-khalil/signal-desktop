import { definePreset } from "@primeuix/themes";
import { palette } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

export const customPrimeVueTheme = definePreset(Aura, {
  semantic: {
    primary: palette("{blue}"),
  },
});
