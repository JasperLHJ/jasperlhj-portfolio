<template>
  <article
    ref="rowRef"
    class="grid grid-cols-1 gap-10 border-b border-border py-20 last:border-b-0 lg:grid-cols-12 lg:items-center lg:gap-12"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div
      class="lg:col-span-5"
      :class="imageLeft ? 'lg:order-1' : 'lg:order-2'"
    >
      <div
        ref="imgWrapRef"
        class="overflow-hidden rounded-lg shadow-[0_12px_40px_-12px_rgba(26,24,20,0.18)] transition-transform duration-200 ease-out will-change-transform"
        :style="tiltStyle"
      >
        <NuxtImg
          :src="project.image"
          :alt="`${project.title} screenshot`"
          class="aspect-[4/3] w-full object-cover"
          format="webp"
          loading="lazy"
          width="900"
          height="675"
        />
      </div>
    </div>

    <div
      class="lg:col-span-7"
      :class="imageLeft ? 'lg:order-2' : 'lg:order-1'"
    >
      <div class="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-muted">
        <span>{{ project.year }}</span>
        <span
          v-for="tag in project.tags.slice(0, 5)"
          :key="tag"
          class="rounded-full bg-tag-bg px-2 py-0.5"
        >
          {{ tag }}
        </span>
      </div>
      <h2 class="mt-4 font-display text-3xl text-ink">
        {{ project.title }}
      </h2>
      <p class="mt-4 max-w-xl font-sans text-base text-ink-muted">
        {{ project.description }}
      </p>
      <a
        :href="project.url"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-6 inline-block font-sans text-base text-accent underline decoration-transparent underline-offset-4 transition-all duration-200 hover:decoration-accent"
      >
        Visit project →
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '~/types/content'

const props = defineProps<{
  project: Project
  index: number
}>()

const imageLeft = computed(() => props.index % 2 === 0)

const rowRef = ref<HTMLElement | null>(null)
const imgWrapRef = ref<HTMLElement | null>(null)

const rotateY = ref(0)

const tiltStyle = computed(() => ({
  transform: `perspective(800px) rotateY(${rotateY.value}deg)`,
}))

function onMove(e: MouseEvent) {
  const row = rowRef.value
  if (!row) return
  const r = row.getBoundingClientRect()
  const x = e.clientX - r.left
  const p = x / r.width
  const sign = imageLeft.value ? 1 : -1
  rotateY.value = sign * (p - 0.5) * 4
}

function onLeave() {
  rotateY.value = 0
}

const { prefersReducedMotion } = usePrefersReducedMotion()

onMounted(() => {
  if (prefersReducedMotion.value) return
  const row = rowRef.value
  if (!row) return

  const fromX = imageLeft.value ? -48 : 48

  gsap.fromTo(
    row,
    { opacity: 0, x: fromX },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: row,
        start: 'top 80%',
        once: true,
        scroller: document.documentElement,
      },
    },
  )
  ScrollTrigger.refresh()
})
</script>
