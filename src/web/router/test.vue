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
  window.emitters[ELECTRON_LISTENERS.SUBMIT]({
    content: "function add(a,b){return a+b;};",
    test: "import test from 'node:test';import assert from 'node:assert'; test('add', () => { assert.equal(add(1, 2), 3); });test('add2', () => { assert.equal(add(2, 3), 5); });",
  }).then((result) => {
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
