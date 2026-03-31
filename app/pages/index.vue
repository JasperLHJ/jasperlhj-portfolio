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

async function onLoadDone() {
  if (!import.meta.client) return
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  ScrollTrigger.refresh()
}
</script>
