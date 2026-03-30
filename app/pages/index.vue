<template>
  <div>
    <HomeLoadingScreen @done="onLoadDone" />
    <HomeHeroSection />
    <HomeAboutSection />
    <HomeSkillsMarquee />
    <HomeFeaturedProjects />
    <HomeCta />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Home',
  description:
    'Full stack developer focused on NuxtJS and Laravel. Selected work and contact.',
})

function onLoadDone() {
  /* reserved for analytics or focus management */
}
</script>
