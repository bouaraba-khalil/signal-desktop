<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Button, InputText, Card, InputGroup, InputGroupAddon } from "primevue";
import { Field as VeeField, useForm } from "vee-validate";
import * as vue from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { z } from "zod";

import { authClient } from "@/lib/better-auth";

import { messages } from "./messages";

const { t } = useI18n({ messages });

const router = useRouter();
const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email({ message: "error.email.required" }),
      password: z
        .string({ message: "error.password.required" })
        .min(8, { message: "error.password.min" }),
    }),
  ),
  initialValues: {
    email: "bouaraba.khalil@gmail.com",
    password: "test1234",
  },
});

const showPassword = vue.ref<boolean>(false);
const serverError = vue.ref<boolean>(false);

const onSubmit = form.handleSubmit(async (values) => {
  serverError.value = false;
  try {
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    if (error || !data) {
      serverError.value = true;
      form.setFieldError("email", "error.login");
      form.setFieldError("password", "error.login");
    }
    localStorage.setItem("token", data?.token ?? "");
    router.push({ name: "app" });
  } catch {
    serverError.value = true;
    form.setFieldError("email", "error.internet_error");
    form.setFieldError("password", "error.internet_error");
  }
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="mb-4 flex flex-col items-center gap-2">
      <img src="@/assets/images/icon.png" alt="Signal" class="size-20 rounded-xl" />
      <h1 class="text-2xl font-bold">{{ t("title") }}</h1>
    </div>

    <Card>
      <template #content>
        <form @submit="onSubmit" class="grid gap-6">
          <VeeField v-slot="{ field, errors }" name="email">
            <div :data-invalid="!!errors.length" class="flex flex-col gap-2">
              <label for="email">
                {{ t("email") }}
              </label>
              <InputText
                id="email"
                v-bind="field"
                :aria-invalid="!!errors.length"
                :default-value="field.value"
              />
            </div>
          </VeeField>

          <VeeField v-slot="{ field, errors }" name="password">
            <div :data-invalid="!!errors.length" class="flex flex-col gap-2">
              <label for="password">
                {{ t("password") }}
              </label>
              <InputGroup>
                <InputText
                  id="password"
                  v-bind="field"
                  :aria-invalid="!!errors.length"
                  :default-value="field.value"
                  :type="showPassword ? 'text' : 'password'"
                />
                <InputGroupAddon @click="showPassword = !showPassword">
                  <i
                    class="pi pi-eye transition-all duration-300 hover:text-primary"
                    v-if="showPassword"
                  />
                  <i
                    class="pi pi-eye-slash transition-all duration-300 hover:text-primary"
                    v-else
                  />
                </InputGroupAddon>
              </InputGroup>

              <p v-if="errors.length" class="text-red-500">
                {{ errors.map((error) => t(error)).join(", ") }}
              </p>
            </div>
          </VeeField>
          <Button
            class="mt-4"
            type="submit"
            :label="t('button')"
            :loading="form.isSubmitting.value"
          />
        </form>
      </template>
    </Card>
  </div>
</template>
