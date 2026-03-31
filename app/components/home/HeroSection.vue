<template>
  <section
    class="relative flex min-h-screen flex-col justify-center px-5 pb-24 pt-28 md:px-8"
    aria-label="Introduction"
  >
    <div
      class="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 items-center gap-14 lg:grid-cols-[3fr_2fr] lg:gap-12"
    >
      <div class="flex flex-col justify-center">
        <h1 class="sr-only">
          {{ profile.name }}, {{ profile.title }}, {{ profile.location }}
        </h1>
        <div class="space-y-0">
          <p
            ref="line1Ref"
            class="font-display font-light leading-[0.95] text-hero text-ink"
          >
            Jasper Lee
          </p>
          <p
            ref="line2Ref"
            class="font-display font-light leading-[0.95] text-hero text-ink"
          >
            Hau Jun.
          </p>
          <div
            ref="dividerRef"
            class="my-8 h-px max-w-md origin-left bg-border"
            style="transform: scaleX(0)"
          />
          <p
            ref="subtitleRef"
            class="font-sans text-lg text-ink-muted"
          >
            {{ profile.title }}
          </p>
          <p
            ref="locRef"
            class="mt-2 font-mono text-xs text-ink-faint"
          >
            · {{ profile.location }}
          </p>
        </div>
      </div>

      <div class="flex min-h-[360px] items-center justify-center lg:min-h-[520px]">
        <OrbitCanvas />
      </div>
    </div>

    <div
      class="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <div
        class="scroll-indicator__line h-12 w-px origin-top bg-ink-faint"
      />
      <span class="font-mono text-xs uppercase tracking-widest text-ink-muted">scroll</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import profileJson from '~/content/profile.json'
import type { Profile } from '~/types/content'
import OrbitCanvas from './OrbitCanvas.vue'

const profile = profileJson as Profile

const line1Ref = ref<HTMLElement | null>(null)
const line2Ref = ref<HTMLElement | null>(null)
const dividerRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const locRef = ref<HTMLElement | null>(null)
const { prefersReducedMotion } = usePrefersReducedMotion()

onMounted(() => {
  const l1 = line1Ref.value
  const l2 = line2Ref.value
  const div = dividerRef.value
  const sub = subtitleRef.value
  const loc = locRef.value

  if (prefersReducedMotion.value) {
    if (div) div.style.transform = 'scaleX(1)'
    return
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.fromTo(
    [l1, l2].filter(Boolean),
    { opacity: 0, y: 36 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
  )

  if (div) {
    tl.to(div, { scaleX: 1, duration: 1, ease: 'power3.out' }, '-=0.45')
  }

  tl.fromTo(
    [sub, loc].filter(Boolean),
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.85, stagger: 0.08 },
    '-=0.35',
  )
})
</script>
