<script setup lang="ts">
import { Select } from "primevue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n({
  useScope: "global",
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
