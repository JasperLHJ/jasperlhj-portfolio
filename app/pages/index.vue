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
import profileJson from '~/content/profile.json'
import type { Profile } from '~/types/content'

definePageMeta({
  layout: 'default',
})

const profile = profileJson as Profile

const siteUrl = 'https://jasperlhj.com'
const pageTitle = 'Jasper Lee Hau Jun — Full Stack Developer'
const pageDescription = 'Malaysia-based Full Stack Developer specializing in NuxtJS and Laravel. Building fast, scalable web applications for Malaysian businesses and beyond.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: siteUrl,
  ogSiteName: profile.name,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          url: siteUrl,
          jobTitle: profile.title,
          description: profile.bio,
          address: { '@type': 'PostalAddress', addressCountry: profile.location },
          email: profile.email,
          sameAs: [profile.social.github, profile.social.linkedin],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: profile.name,
          url: siteUrl,
        },
      ]),
    },
  ],
})

defineOgImage({
  title: pageTitle,
  description: pageDescription,
})

async function onLoadDone() {
  if (!import.meta.client) return
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  ScrollTrigger.refresh()
}
</script>
