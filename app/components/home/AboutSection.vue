<template>
  <section
    class="bg-cream-alt py-24 md:py-32"
    aria-labelledby="about-heading"
  >
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <h2
          id="about-heading"
          class="font-display text-3xl font-normal leading-tight text-ink lg:max-w-sm"
        >
          End-to-end product builder.
        </h2>
        <p class="max-w-xl font-sans text-base text-ink-muted">
          {{ profile.bio }}
        </p>
      </div>

      <div
        ref="statsRef"
        class="mt-20 grid grid-cols-2 border-t border-border pt-12 lg:grid-cols-4"
        role="list"
      >
        <div
          v-for="(stat, i) in stats"
          :key="stat.key"
          class="relative px-4 py-6 text-center lg:px-6"
          :class="i > 0 ? 'lg:border-l lg:border-border' : ''"
          role="listitem"
        >
          <p
            :ref="(el) => setNumRef(el as HTMLElement, i)"
            class="font-display text-3xl text-ink"
          >
            <template v-if="stat.isText">&nbsp;</template>
            <template v-else>0{{ stat.suffix }}</template>
          </p>
          <p class="mt-2 font-sans text-sm text-ink-muted">
            {{ stat.label }}
          </p>
          <p
            v-if="stat.hint"
            class="mt-1 font-mono text-xs text-ink-faint"
          >
            {{ stat.hint }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileJson from '~/content/profile.json'
import type { Profile } from '~/types/content'

const profile = profileJson as Profile

const stats = [
  { key: 'proj', label: 'Projects shipped', hint: '', target: 4, suffix: '' },
  { key: 'yrs', label: 'Years building', hint: '', target: 2, suffix: '+' },
  { key: 'stack', label: 'Core stacks', hint: 'Nuxt + Laravel', target: 2, suffix: '' },
  { key: 'loc', label: 'Based in', hint: '', target: 0, suffix: 'MY', isText: true },
]

const statsRef = ref<HTMLElement | null>(null)
const numEls = ref<(HTMLElement | null)[]>([])

function setNumRef(el: HTMLElement | null, i: number) {
  if (el) numEls.value[i] = el
}

const { prefersReducedMotion } = usePrefersReducedMotion()

onMounted(() => {
  const section = statsRef.value
  if (!section) return

  const items = stats.map((s, i) => ({
    el: numEls.value[i],
    ...s,
  }))

  if (prefersReducedMotion.value) {
    items.forEach((item) => {
      if (!item.el) return
      if (item.isText) item.el.textContent = item.suffix
      else item.el.textContent = `${item.target}${item.suffix}`
    })
    return
  }

  items.forEach((item) => {
    if (!item.el) return
    if (item.isText) {
      item.el.textContent = ''
    }
    else {
      item.el.textContent = '0' + item.suffix
    }
  })

  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    scroller: document.documentElement,
    onEnter: () => {
      items.forEach((item) => {
        if (!item.el) return
        if (item.isText) {
          gsap.to(item.el, {
            duration: 0.6,
            ease: 'power3.out',
            onStart: () => {
              item.el!.textContent = item.suffix
            },
          })
          return
        }
        const counter = { val: 0 }
        gsap.to(counter, {
          val: item.target,
          duration: 1.05,
          ease: 'power3.out',
          onUpdate: () => {
            item.el!.textContent = `${Math.round(counter.val)}${item.suffix}`
          },
        })
      })
    },
  })

  ScrollTrigger.refresh()
})
</script>
