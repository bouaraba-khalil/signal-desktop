<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { Select } from "primevue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import Loader from "@/components/loader/loader.vue";
import { useGet } from "@/composables/useGet";
import { localMapper } from "@/lib/utils";

import type { Course, Lesson, Chapter } from "@/types/core";

const route = useRoute();
const { locale } = useI18n();
const courseId = route.params.courseId;

const getCourse = useGet<Course & { chapters: (Chapter & { lessons: Lesson[] })[] }>({
  path: `/core/course/${courseId}`,
  options: {
    enabled: !!courseId,
  },
});
const chapter = ref<(Chapter & { lessons: Lesson[] }) | null>(null);
const lesson = ref<Lesson | null>(null);

watch(getCourse.data, (newVal) => {
  if (!!newVal && !chapter.value && !lesson.value) {
    chapter.value = newVal?.chapters?.[0] ?? null;
    lesson.value = newVal?.chapters?.[0]?.lessons?.[0] ?? null;
  }
});

const lessonContent = computed(() => {
  if (!lesson.value) return "";
  const md = new MarkdownIt();
  const result = md.render(localMapper(locale.value, lesson.value, "content") ?? "");
  return result;
});

const lessonTitle = computed(() => {
  if (!lesson.value) return "";
  return localMapper(locale.value, lesson.value, "title");
});
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div v-if="getCourse.isLoading.value" class="flex items-center justify-center"><Loader /></div>
    <div v-else class="flex flex-1 flex-col">
      <div>
        <Select
          v-model="chapter"
          :options="getCourse.data.value?.chapters ?? []"
          optionLabel="title_fr"
        />
        <Select v-model="lesson" :options="chapter?.lessons ?? []" optionLabel="title_fr" />
      </div>
      <div class="flex flex-1 p-4">
        <Splitter class="flex-1">
          <SplitterPanel class="p-4" :min-size="30">
            <div>
              <h1 class="text-2xl font-bold">{{ lessonTitle }}</h1>
              <div v-html="lessonContent" />
            </div>
          </SplitterPanel>
          <SplitterPanel class="p-4" :min-size="30"> Panel 2 </SplitterPanel>
        </Splitter>
      </div>
    </div>
  </div>
</template>
