<script setup lang="ts">
import { gsap } from "gsap";
import * as vue from "vue";

let tween: gsap.core.Tween;

vue.onMounted(() => {
  tween = gsap.to(".glow", {
    scale: 0.5,
    duration: 5,
    ease: "back.inOut(4)",
    repeat: -1,
    yoyo: true,
  });
});
vue.onUnmounted(() => {
  tween?.kill?.();
});
</script>

<template>
  <div class="relative flex flex-1 overflow-hidden">
    <div
      class="glow pointer-events-none absolute top-20 right-20 h-50 w-50 rounded-full bg-orange-400/10 blur-3xl"
    ></div>
    <div
      class="glow pointer-events-none absolute bottom-20 left-20 h-50 w-50 rounded-full bg-orange-400/10 blur-3xl"
    ></div>
    <slot />
  </div>
</template>
