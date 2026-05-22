<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { Button } from "primevue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import type { Courses } from "@/types/core";

const { locale } = useI18n();

const props = defineProps<{
  course: Courses & { order: number };
}>();

const description = computed(() => {
  const localDescription =
    props.course.description[locale.value as keyof typeof props.course.description] ?? "";
  const md = new MarkdownIt();

  return md.render(localDescription);
});

const title = computed(() => {
  return props.course.name[locale.value as keyof typeof props.course.name] ?? "";
});
</script>

<template>
  <div
    class="group/card rounded-xl border p-4 transition-all duration-300 *:transition-all *:duration-300 hover:border-primary"
  >
    <div class="flex items-center gap-6">
      <div class="text-4xl font-bold group-hover/card:text-primary">{{ props.course.order }}</div>
      <div class="flex flex-col gap-2">
        <h1 class="text-lg font-bold group-hover/card:text-primary">
          {{ title }}
        </h1>
        <div class="text-sm text-gray-500" v-html="description" />
      </div>
    </div>
    <RouterLink :to="`/app/courses/${props.course._id}`">
      <Button
        label="Start"
        icon="pi pi-chevron-right"
        iconPos="right"
        class="mt-8 w-full"
        icon-class="text-xs!"
      />
    </RouterLink>
  </div>
</template>
