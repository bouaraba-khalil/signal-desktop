<script setup lang="ts">
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";

import type { Lesson } from "@/types/core";

const props = defineProps<{
  lessons: Lesson;
}>();
</script>

<template>
  <Splitter class="flex-1" state-storage="local" state-key="lessonSize">
    <SplitterPanel class="flex items-center justify-center" :min-size="20"> Panel 1 </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center" :min-size="20"> Panel 2 </SplitterPanel>
  </Splitter>
</template>
