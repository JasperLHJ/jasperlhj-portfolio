<template>
  <div class="pb-24 pt-28 md:pt-32">
    <header class="mx-auto max-w-[1400px] px-5 md:px-8">
      <h1 class="font-display font-light text-hero text-ink">
        Projects
      </h1>
      <p class="mt-3 font-mono text-xs text-ink-muted">
        {{ String(projects.length).padStart(2, '0') }} works / {{ yearLabel }}
      </p>
      <div class="mt-10 h-px w-full bg-border" />
    </header>

    <div class="mx-auto max-w-[1400px] px-5 md:px-8">
      <ProjectsRow
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import projectsJson from '~/content/projects.json'
import type { Project } from '~/types/content'

definePageMeta({
  layout: 'default',
})

const projects = projectsJson as Project[]

const yearLabel = computed(() => {
  const years = [...new Set(projects.map((p) => p.year))]
  return years.join(' · ')
})

const siteUrl = 'https://jasperlhj.com'
const pageTitle = 'Projects — Jasper Lee Hau Jun'
const pageDescription = 'Full stack projects built for Malaysian clients and beyond — e-commerce, SaaS, and web apps using Nuxt and Laravel.'

useSeoMeta({
  title: 'Projects',
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: `${siteUrl}/projects`,
  ogSiteName: 'Jasper Lee Hau Jun',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/projects` }],
})

defineOgImage('NuxtSeo.takumi', {
  title: pageTitle,
  description: pageDescription,
})
</script>
