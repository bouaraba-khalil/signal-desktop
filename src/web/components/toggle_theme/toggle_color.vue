<script setup lang="ts">
import { palette, updatePreset } from "@primeuix/themes";
import { useLocalStorage } from "@vueuse/core";
import { Select } from "primevue";
import { onMounted, watch } from "vue";

const primaryColor = useLocalStorage("primaryColor", "blue");
onMounted(() => {
  updatePreset({
    semantic: {
      primary: palette(`{${primaryColor.value}}`),
    },
  });
});

watch(primaryColor, (newVal) => {
  updatePreset({
    semantic: {
      primary: palette(`{${newVal}}`),
    },
  });
});

const colorList = [
  "emerald",
  "green",
  "lime",
  "red",
  "orange",
  "amber",
  "yellow",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

// todo add pinia to store and restore the primary color when the component is mounted
</script>

<template>
  <Select v-model="primaryColor" :options="colorList" class="w-20" size="small">
    <template #value="slotProps">
      <div class="flex items-center gap-2">
        <div :class="['h-4 w-4 rounded-full', `bg-${slotProps.value}-500`]"></div>
        <!-- <span class="text-xs">{{ slotProps.value }}</span> -->
      </div>
    </template>
    <template #option="slotProps">
      <div class="flex items-center gap-2">
        <div :class="['h-4 w-4 rounded-full', `bg-${slotProps.option}-500`]"></div>
        <!-- <span class="text-xs">{{ slotProps.option }}</span> -->
      </div>
    </template>
  </Select>

  <!-- this is only to load the classes ahead of time to have a preview -->
  <div class="hidden">
    <div class="bg-emerald-500"></div>
    <div class="bg-green-500"></div>
    <div class="bg-lime-500"></div>
    <div class="bg-red-500"></div>
    <div class="bg-orange-500"></div>
    <div class="bg-amber-500"></div>
    <div class="bg-yellow-500"></div>
    <div class="bg-teal-500"></div>
    <div class="bg-cyan-500"></div>
    <div class="bg-sky-500"></div>
    <div class="bg-blue-500"></div>
    <div class="bg-indigo-500"></div>
    <div class="bg-violet-500"></div>
    <div class="bg-purple-500"></div>
    <div class="bg-fuchsia-500"></div>
    <div class="bg-pink-500"></div>
    <div class="bg-rose-500"></div>
  </div>
</template>
