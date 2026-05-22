<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { Button } from "primevue";
import * as vue from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

import { localMapper } from "@/lib/utils";

import type { LearningPath } from "@/types/core";

const { locale } = useI18n();

const props = defineProps<{
  learningPath: LearningPath;
}>();

const description = vue.computed(() => {
  const description = localMapper(locale.value, props.learningPath, "description");
  const md = new MarkdownIt();

  return md.render(description);
});
</script>

<template>
  <div
    class="group/card flex flex-col overflow-hidden rounded-xl border p-4 transition-all duration-300 *:transition-all *:duration-300 group-hover/card:*:opacity-80 hover:border-primary"
  >
    <div class="flex flex-1 flex-col gap-2">
      <img
        :src="props.learningPath.image"
        alt="learning path image"
        class="h-40 w-full rounded-xl object-cover"
      />
      <h3 class="text-lg font-bold transition-all duration-300 group-hover/card:text-primary">
        {{ localMapper(locale, props.learningPath, "title") }}
      </h3>
      <div class="flex flex-col gap-2 text-sm text-gray-500" v-html="description" />
    </div>
    <RouterLink :to="`/app/learning-path/${props.learningPath.id}`" class="w-full">
      <Button
        class="flex-end mt-4 w-full"
        label="Start"
        icon="pi pi-chevron-right"
        iconPos="right"
        icon-class="text-xs!"
      />
    </RouterLink>
  </div>
</template>
