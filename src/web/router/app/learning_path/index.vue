<script setup lang="ts">
import LearningPathList from "./components/learning_path_list.vue";
import LearningPathTitle from "./components/learning_path_title.vue";
</script>

<template>
  <div class="flex flex-col gap-4">
    <LearningPathTitle />
    <LearningPathList />
  </div>
</template>
