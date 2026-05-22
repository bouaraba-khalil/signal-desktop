import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "fr",
  fallbackLocale: "en",
  warnHtmlMessage: false,
  warnHtmlInMessage: false,
});

export default i18n;
