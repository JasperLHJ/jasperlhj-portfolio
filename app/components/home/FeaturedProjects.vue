<template>
  <section
    class="py-24 md:py-32"
    aria-labelledby="work-heading"
  >
    <div class="mx-auto max-w-[1400px] px-5 md:px-8">
      <header class="mb-16 pl-2 md:pl-16">
        <p class="font-mono text-xs text-ink-muted">
          {{ String(featured.length).padStart(2, '0') }} projects
        </p>
        <h2
          id="work-heading"
          class="mt-2 font-display text-3xl text-ink"
        >
          Selected Work
        </h2>
      </header>

      <ul
        ref="listRef"
        class="divide-y divide-border"
        role="list"
      >
        <li
          v-for="(project, index) in featured"
          :key="project.id"
          class="group py-14 first:pt-0"
        >
          <article class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 lg:items-center">
            <div class="font-mono text-xs text-ink-muted lg:col-span-3">
              <span class="text-ink-faint">[</span>
              {{ String(index + 1).padStart(2, '0') }}
              <span class="text-ink-faint">]</span>
              <span class="mx-3 text-ink-faint">·</span>
              [ {{ project.year }} ]
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags.slice(0, 4)"
                  :key="tag"
                  class="rounded-full bg-tag-bg px-2 py-0.5 text-[0.65rem] text-ink-muted"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="lg:col-span-5">
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="featured-title-link block font-display text-3xl text-ink transition-colors duration-200 hover:text-accent"
              >
                <span class="inline-block">{{ project.title }}</span>
                <p class="mt-4 max-w-md font-sans text-base font-normal text-ink-muted">
                  {{ project.description }}
                </p>
                <span
                  class="mt-6 inline-flex items-center gap-1 font-sans text-sm text-accent transition-colors duration-200 group-hover:text-accent-hover"
                >
                  Visit →
                </span>
              </a>
            </div>

            <div class="featured-project__media lg:col-span-4">
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="block overflow-hidden rounded-lg shadow-[0_12px_40px_-12px_rgba(26,24,20,0.2)] transition-transform duration-[220ms] ease-out group-hover:scale-[1.03]"
                tabindex="-1"
                aria-hidden="true"
              >
                <NuxtImg
                  :src="project.image"
                  :alt="`${project.title} screenshot`"
                  class="aspect-[4/3] w-full object-cover"
                  format="webp"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </a>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import projectsJson from '~/content/projects.json'
import type { Project } from '~/types/content'

const projects = projectsJson as Project[]
const featured = computed(() => projects.filter((p) => p.featured))

const listRef = ref<HTMLElement | null>(null)

const { prefersReducedMotion } = usePrefersReducedMotion()

onMounted(() => {
  if (prefersReducedMotion.value) return

  nextTick(() => {
    const root = listRef.value
    if (!root) return
    const tiles = Array.from(root.querySelectorAll<HTMLElement>(':scope > li'))
    if (!tiles.length) return

    // Animate copy/meta only — not the image column. Opacity:0 on the whole
    // `<li>` prevents reliable lazy image loading on some mobile browsers.
    tiles.forEach((tile) => {
      const parts = tile.querySelectorAll<HTMLElement>(
        ':scope > article > div:not(.featured-project__media)',
      )
      if (!parts.length) return
      gsap.fromTo(
        parts,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: tile,
            start: 'top 85%',
            once: true,
            scroller: document.documentElement,
          },
        },
      )
    })
    ScrollTrigger.refresh()
  })
})
</script>

<style scoped>
.featured-title-link {
  position: relative;
  text-decoration: none;
}

.featured-title-link > span:first-child {
  position: relative;
  display: inline-block;
}

.featured-title-link > span:first-child::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.22s ease;
}

.featured-title-link:hover > span:first-child::after,
.group:hover .featured-title-link > span:first-child::after {
  transform: scaleX(1);
}
</style>
