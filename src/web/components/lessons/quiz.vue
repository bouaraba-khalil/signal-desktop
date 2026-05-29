<script setup lang="ts">
import { Button } from "primevue";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import type { Lesson, Quizz } from "@/types/core";

const { locale } = useI18n();

const props = defineProps<{
  lesson: Lesson;
}>();

const selectedOption = ref<{ label: string; isCorrect: boolean } | null>(null);
const isSubmitted = ref(false);
function selectOption(option: { label: string; isCorrect: boolean }) {
  if (isSubmitted.value) return;
  selectedOption.value = option;
}
function submit() {
  if (selectedOption.value === null) return;
  isSubmitted.value = true;
}

function reset() {
  isSubmitted.value = false;
  selectedOption.value = null;
}

const question = computed(() => {
  return props.lesson.quiz?.question[locale.value as keyof typeof props.lesson.quiz.question] ?? "";
});

const options = computed(() => {
  return props.lesson.quiz?.options.map((option) => {
    return {
      label: option.option[locale.value as keyof typeof option.option],
      isCorrect: option.isCorrect,
    };
  }) as { label: string; isCorrect: boolean }[];
});
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 p-4">
    <h1 class="text-2xl font-bold">{{ question }}</h1>
    <div class="grid grid-cols-2 gap-2">
      <div v-for="option in options" :key="option.label">
        <Button
          :label="option.label"
          :class="[
            'w-full',
            isSubmitted && option.isCorrect && selectedOption?.label === option.label
              ? 'border-green-500! bg-green-500!'
              : isSubmitted && !option.isCorrect && selectedOption?.label === option.label
                ? 'border-red-500! bg-red-500!'
                : '',
          ]"
          :variant="selectedOption?.label === option.label ? 'filled' : 'outlined'"
          size="small"
          @click="selectOption(option)"
        />
      </div>
    </div>
    <Button
      v-if="!isSubmitted"
      label="Submit"
      class="mt-2 w-full"
      size="small"
      @click="submit"
      :disabled="selectedOption === null"
    />
    <div v-if="isSubmitted">
      <div v-if="selectedOption?.isCorrect">
        <h2 class="text-green-500">Correct</h2>
      </div>
      <div v-else>
        <h2 class="text-red-500">Incorrect</h2>
      </div>
      <Button label="Reset" class="mt-2 w-full" size="small" @click="reset" />
    </div>
  </div>
</template>
