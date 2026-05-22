<script setup lang="ts">
import * as vue from "vue";
import { useRouter } from "vue-router";

import LoginBackground from "./components/login_background.vue";
import LoginForm from "./components/login_form.vue";
import Loader from "@/components/loader/loader.vue";
import { authClient } from "@/lib/better-auth";

const router = useRouter();
const session = authClient.useSession();

vue.onMounted(() => {
  if (session?.value?.isPending) return;

  if (session?.value?.data?.user) {
    router.push({ name: "app" });
  }
});
vue.watch(session, (newVal) => {
  if (newVal?.isPending) return;

  if (newVal?.data?.user) {
    router.push({ name: "app" });
  }
});
</script>

<template>
  <LoginBackground>
    <div v-if="session?.isPending" class="flex flex-1 items-center justify-center">
      <Loader />
    </div>
    <div v-else class="flex flex-1 items-center justify-center">
      <LoginForm />
    </div>
  </LoginBackground>
</template>
