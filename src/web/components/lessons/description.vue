<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { Lesson } from "@/types/core";

const { locale } = useI18n();

const props = defineProps<{
  lesson: Lesson;
}>();

const title = computed(() => {
  return props.lesson.name[locale.value as keyof typeof props.lesson.name] ?? "";
});

const description = computed(() => {
  return props.lesson.content[locale.value as keyof typeof props.lesson.content] ?? "";
});
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <div class="text-sm text-gray-500" v-html="description" />
  </div>
</template>
