<script setup lang="ts">
import * as vue from "vue";
import { RouterView, useRouter } from "vue-router";

import Loader from "@/components/loader/loader.vue";
import { authClient } from "@/lib/better-auth";

const router = useRouter();
const session = authClient.useSession();

vue.onMounted(() => {
  if (session?.value?.isPending) return;

  if (!session?.value?.data?.user) {
    router.push({ name: "login" });
  } else if (session?.value?.data?.user) {
    router.push({ name: "learning-path" });
  }
});
vue.watch(session, (newVal) => {
  if (newVal?.isPending) return;
  if (!newVal?.data?.user) {
    router.push({ name: "login" });
  }
});
</script>

<template>
  <div v-if="session?.isPending" class="flex flex-1 items-center justify-center">
    <Loader />
  </div>
  <div v-else class="flex flex-1 flex-col">
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>
