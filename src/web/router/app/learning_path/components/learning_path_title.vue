<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { messages } from "../message";

const { t } = useI18n({ messages });
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="m-auto flex w-fit items-center gap-2 rounded-full border border-primary px-2 py-1 text-primary"
    >
      <i class="pi pi-bullseye" />
      <span class="text-sm font-bold">{{ t("title.small-icon") }}</span>
    </div>
    <h1 class="text-center text-4xl font-bold">{{ t("title.title") }}</h1>
    <p class="m-auto w-lg px-4 text-center text-color-emphasis">
      {{ t("title.description") }}
    </p>
  </div>
</template>
