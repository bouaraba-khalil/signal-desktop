<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { Select } from "primevue";
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";

const locale = useLocalStorage("locale", "fr");

const i18n = useI18n({
  useScope: "global",
});

onMounted(() => {
  i18n.locale.value = locale.value;
});
watch(locale, (newVal) => {
  i18n.locale.value = newVal;
});
const availableLocales = ["en", "fr", "ar"];
const translations = {
  en: "English",
  fr: "Francais",
  ar: "العربية",
} as Record<string, string>;
// todo add pinia to store the locale and restore it when the component is mounted
</script>

<template>
  <Select v-model="locale" :options="availableLocales" class="w-28" size="small">
    <template #dropdownicon>
      <i class="pi pi-globe text-xs" />
    </template>
    <template #value="slotProps">
      <span class="text-xs">{{ translations[slotProps.value] }}</span>
    </template>
    <template #option="slotProps">
      <span class="text-xs">{{ translations[slotProps.option] }}</span>
    </template>
  </Select>
</template>
