<template>
  <div class="min-h-screen bg-cream text-ink">
    <LayoutTheNavbar />
    <LayoutCustomCursor />
    <main id="main">
      <slot />
    </main>
    <LayoutTheFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) =>
    titleChunk
      ? `${titleChunk} — Jasper Lee Hau Jun`
      : 'Jasper Lee Hau Jun — Full Stack Developer',
})
</script>
