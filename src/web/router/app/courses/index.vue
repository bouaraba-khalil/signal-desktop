<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import Loader from "@/components/loader/loader.vue";
import { useGet } from "@/composables/useGet";

import CourseCard from "./components/course_card.vue";

import type { Course, LearningPath } from "@/types/core";

const { locale } = useI18n();

const route = useRoute();
const learningPathId = route.params.learningPathId;

const getCourseList = useGet<LearningPath & { courses: (Course & { order: number })[] }>({
  path: `/core/learning-paths/${learningPathId}`,
  options: {
    enabled: !!learningPathId,
  },
});
const description = computed(() => {
  const localDescription =
    getCourseList.data.value?.description[
      locale.value as keyof typeof getCourseList.data.value.description
    ] ?? "";
  const md = new MarkdownIt();
  return md.render(localDescription);
});

const title = computed(() => {
  return (
    getCourseList.data.value?.name[locale.value as keyof typeof getCourseList.data.value.name] ?? ""
  );
});
</script>

<template>
  <div>
    <div v-if="getCourseList.isLoading.value" class="flex items-center justify-center">
      <Loader />
    </div>
    <div v-else class="m-4 flex flex-col gap-4">
      <h1 class="w-full text-center text-4xl font-bold text-primary">
        {{ title }}
      </h1>
      <div
        class="flex flex-col gap-4 text-lg font-medium text-color-emphasis"
        v-html="description"
      />
      <CourseCard
        v-for="course in getCourseList.data.value.courses"
        :key="course._id"
        :course="course"
      />
    </div>
  </div>
</template>
