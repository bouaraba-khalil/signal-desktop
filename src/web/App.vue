<script setup lang="ts">
import { onMounted, ref, Transition, watch } from "vue";
import { useI18n } from "vue-i18n";
import { RouterView, useRoute } from "vue-router";

import LangSelector from "./components/lang_selector/lang_selector.vue";
import TextSize from "./components/text_size/text_size.vue";
import ToggleColor from "./components/toggle_theme/toggle_color.vue";
import ToggleTheme from "./components/toggle_theme/toggle_theme.vue";
import Logout from "./components/user/logout.vue";

const count = ref(0);
const route = useRoute();
const { locale } = useI18n();

watch(route, (newVal) => {
  console.log(newVal.path);
});

watch(locale, (newVal) => {
  if (newVal === "ar") {
    document.dir = "rtl";
  } else {
    document.dir = "ltr";
  }
});

onMounted(() => {
  window.electronListeners["onTest"]((value: number) => {
    count.value = value;
  });
});
</script>

<template>
  <div class="flex min-h-screen flex-col pt-[30px]">
    <RouterLink to="/app/learning-path" class="absolute top-2 left-2 text-primary"
      ><i class="pi pi-home"
    /></RouterLink>
    <p class="absolute top-0 left-10 text-2xl font-bold text-primary">{{ count }}</p>
    <div class="sticky top-10 z-10 flex items-center justify-end gap-2">
      <Logout />
      <ToggleTheme />
      <LangSelector />
      <ToggleColor />
      <TextSize />
    </div>
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
