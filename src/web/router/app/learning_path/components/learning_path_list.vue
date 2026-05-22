<script setup lang="ts">
import { useI18n } from "vue-i18n";

import LearningPathCard from "./learning_path_card.vue";
import Loader from "@/components/loader/loader.vue";
import { useGet } from "@/composables/useGet";

import type { LearningPath } from "@/types/core";

const { locale } = useI18n();

const getLearningPaths = useGet<LearningPath[]>({
  path: "/core/learning-paths",
});
</script>

<template>
  <div v-if="getLearningPaths.isLoading.value" class="flex items-center justify-center">
    <Loader />
  </div>
  <div v-else class="m-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <LearningPathCard
      v-for="learningPath in getLearningPaths.data.value"
      :key="learningPath.id"
      :learningPath="learningPath"
    />
  </div>
</template>
