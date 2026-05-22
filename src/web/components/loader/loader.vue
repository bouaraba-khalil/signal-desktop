<script setup lang="ts"></script>

<template>
  <div class="loader" />
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid hsl(0, 0%, 50%);
  border-bottom-color: var(--color-primary);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
