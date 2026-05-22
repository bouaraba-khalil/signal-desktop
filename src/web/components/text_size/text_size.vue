<script setup lang="ts">
import { useLocalStorage } from "@vueuse/core";
import { Select } from "primevue";
import { onMounted, ref, watch } from "vue";

const textSize = useLocalStorage("textSize", "16px");

onMounted(() => {
  document.documentElement.style.fontSize = textSize.value;
});

const textSizeList = ["12px", "14px", "16px", "18px", "20px"];

watch(textSize, (newVal) => {
  document.documentElement.style.fontSize = newVal;
});

// todo add pinia to store and restore the text size when the component is mounted
</script>

<template>
  <Select v-model="textSize" :options="textSizeList" class="w-24" size="small"> </Select>
</template>
