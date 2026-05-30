<script setup lang="ts">
import { ELECTRON_EMITTERS, ELECTRON_LISTENERS } from "@shared/events";
import { Button } from "primevue";
import { onMounted } from "vue";

onMounted(() => {
  window.listeners[ELECTRON_EMITTERS.SUBMIT_STATUS]((result) => {
    console.log("listener result", result);
  });
});

function submit() {
  window.emitters[ELECTRON_LISTENERS.SUBMIT]({ file: "test.py", test: "test" }).then((result) => {
    console.log("emitter result", result);
  });
}
</script>

<template>
  <div>
    <h1>Test</h1>
    <Button @click="submit">Submit</Button>
  </div>
</template>
