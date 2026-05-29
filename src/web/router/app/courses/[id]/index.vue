<script setup lang="ts">
import { Button } from "primevue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import LessonsLayout from "@/components/lessons/layout.vue";
import Loader from "@/components/loader/loader.vue";
import { useGet } from "@/composables/useGet";

import type { Course, Lesson, Chapter } from "@/types/core";

const route = useRoute();
const { locale } = useI18n();
const courseId = route.params.courseId;
const lessonsId = ref("6a194bcc0c85749bbf71597f");

const getCourse = useGet<Course & { chapters: (Chapter & { lessons: Lesson[] })[] }>({
  path: `/core/course/${courseId}`,
  options: {
    enabled: !!courseId,
  },
});

const getLessons = useGet<Lesson>({
  path: computed(() => `/core/lesson/${lessonsId.value}`),
  options: computed(() => ({
    enabled: !!lessonsId.value,
  })),
});

const lessons = [
  { name: "quiz", id: "6a194bcc0c85749bbf71597f" },
  { name: "one_file_code", id: "6a194bcc0c85749bbf71598f" },
  { name: "one_file_algo_code", id: "6a194bcc0c85749bbf71599f" },
];
</script>

<template>
  <div class="mt-5 flex flex-1 flex-col">
    <div v-if="getCourse.isLoading.value" class="flex items-center justify-center"><Loader /></div>
    <div v-else class="flex flex-1 flex-col">
      <div>
        <div>
          <h1 class="text-center text-4xl font-bold text-primary">
            {{ getCourse.data.value?.name[locale as keyof typeof getCourse.data.value.name] }}
          </h1>
          <p class="text-center text-color-emphasis">
            {{
              getCourse.data.value?.description[
                locale as keyof typeof getCourse.data.value.description
              ]
            }}
          </p>
        </div>
      </div>
      <div class="flex gap-2 px-2">
        <Button
          v-for="lesson in lessons"
          :key="lesson.id"
          :label="lesson.name"
          @click="lessonsId = lesson.id"
          :variant="lessonsId === lesson.id ? 'filled' : 'outlined'"
          :disabled="getLessons.isLoading.value"
        />
      </div>
      <div v-if="getLessons.isLoading.value" class="flex items-center justify-center">
        <Loader />
      </div>
      <div v-else-if="getLessons.data.value" class="flex flex-1 p-4">
        <LessonsLayout :lessons="getLessons.data.value" />
      </div>
    </div>
  </div>
</template>
