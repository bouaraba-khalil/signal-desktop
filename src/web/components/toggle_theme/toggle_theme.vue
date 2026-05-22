<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { ToggleSwitch } from "primevue";
import { onMounted, watch } from "vue";

const isDarkMode = useLocalStorage("isDarkMode", true);

onMounted(() => {
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  }
});

watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

// todo add pinia to store the theme and restore it when the component is mounted
// todo add a feature to change the primary color of the theme
// change the titleBarOverlay color and symbolColor based on the theme
</script>

<template>
  <ToggleSwitch v-model="isDarkMode" class="w-10">
    <template #handle="{ checked }">
      <i :class="['pi !text-xs', { 'pi-moon': checked, 'pi-sun': !checked }]" />
    </template>
  </ToggleSwitch>
</template>
