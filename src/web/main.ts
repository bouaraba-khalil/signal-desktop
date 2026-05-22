import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import "@/assets/css/main.css";
import { createApp } from "vue";

import App from "./App.vue";
import i18n from "./lib/i18n";
import { customPrimeVueTheme } from "./lib/primevue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(PrimeVue, {
  theme: {
    preset: customPrimeVueTheme,
    options: {
      darkModeSelector: ".dark",
    },
  },
});

app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 10 * 60 * 1000, // 10 min
      },
    },
  },
});

app.mount("#app");
