<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import Loader from "@/components/loader/loader.vue";
import { useGet } from "@/composables/useGet";
import { localMapper } from "@/lib/utils";

import CourseCard from "./components/course_card.vue";

import type { Course, LearningPath } from "@/types/core";

const { locale } = useI18n();

const route = useRoute();
const learningPathId = route.params.learningPathId;

const getCourseList = useGet<LearningPath & { courses: Course[] }>({
  path: `/core/learning-paths/${learningPathId}`,
  options: {
    enabled: !!learningPathId,
  },
});
const md = new MarkdownIt();
const description = computed(() => {
  return md.render(localMapper(locale.value, getCourseList.data.value, "description"));
});
</script>

<template>
  <div>
    <div v-if="getCourseList.isLoading.value" class="flex items-center justify-center">
      <Loader />
    </div>
    <div v-else class="m-4 flex flex-col gap-4">
      <h1 class="w-full text-center text-4xl font-bold text-primary">
        {{ localMapper(locale, getCourseList.data.value, "title") }}
      </h1>
      <div
        class="flex flex-col gap-4 text-lg font-medium text-color-emphasis"
        v-html="description"
      />
      <CourseCard
        v-for="course in getCourseList.data.value.courses"
        :key="course.id"
        :course="course"
      />
    </div>
  </div>
</template>
