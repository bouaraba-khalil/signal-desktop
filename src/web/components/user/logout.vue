<script setup lang="ts">
import { Button } from "primevue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { authClient } from "@/lib/better-auth";

const { t } = useI18n({
  messages: {
    en: {
      logout: "Logout",
    },
    fr: {
      logout: "Déconnexion",
    },
    ar: {
      logout: "الخروج",
    },
  },
});

const router = useRouter();
const isLoading = ref(false);

const session = authClient.useSession();

const logout = async () => {
  isLoading.value = true;
  try {
    await authClient.signOut();
  } catch (error) {
    // manually set the session to null
    authClient.$store.atoms.session.set({
      ...authClient.$store.atoms.session.get(),
      data: null,
      error: null,
      isPending: false,
      isRefetching: false,
    });
  } finally {
    localStorage.removeItem("token");
    router.push({ name: "login" });
    isLoading.value = false;
  }
};
</script>

<template>
  <Button
    v-if="session?.data?.user"
    :label="t('logout')"
    @click="logout"
    size="small"
    :loading="isLoading"
  />
</template>
