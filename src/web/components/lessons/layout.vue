<script setup lang="ts">
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import { computed } from "vue";

import Description from "./description.vue";
import Quiz from "./quiz.vue";

import type { Lesson } from "@/types/core";

const props = defineProps<{
  lessons: Lesson;
}>();

const quiz = computed(() => {
  return props.lessons.quiz!;
});
</script>

<template>
  <Splitter class="flex-1" state-storage="local" state-key="lessonSize">
    <SplitterPanel :min-size="20">
      <Description :lesson="props.lessons" />
    </SplitterPanel>
    <SplitterPanel :min-size="20">
      <Quiz v-if="props.lessons.type === 'quiz'" :quiz="quiz" />
    </SplitterPanel>
  </Splitter>
</template>
