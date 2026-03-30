<template>
  <header>
    <nav
      class="fixed left-0 right-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ease-out"
      :class="
        scrolled
          ? 'bg-[rgba(247,244,239,0.85)] backdrop-blur-[12px]'
          : 'bg-transparent'
      "
      aria-label="Primary"
    >
      <div
        class="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-8"
      >
        <NuxtLink
          to="/"
          class="font-sans text-base font-medium tracking-tight text-ink transition-colors duration-200 hover:text-accent"
        >
          Jasper Lee
        </NuxtLink>

        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <Menu v-if="!menuOpen" :size="22" stroke-width="1.5" />
          <X v-else :size="22" stroke-width="1.5" />
        </button>

        <ul
          class="hidden items-center gap-10 md:flex"
          role="list"
        >
          <li>
            <NuxtLink
              to="/projects"
              class="nav-link font-sans text-sm font-normal tracking-[0.05em] text-ink"
            >
              Projects
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/contact"
              class="nav-link font-sans text-sm font-normal tracking-[0.05em] text-ink"
            >
              Contact
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="menuOpen"
          id="mobile-nav"
          class="fixed inset-0 z-[60] flex flex-col bg-cream px-8 pb-12 pt-24 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <ul class="flex flex-col gap-2" role="list">
            <li>
              <NuxtLink
                to="/"
                class="mobile-nav-link font-display text-3xl text-ink"
                @click="closeMenu"
              >
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/projects"
                class="mobile-nav-link font-display text-3xl text-ink"
                @click="closeMenu"
              >
                Projects
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="mobile-nav-link font-display text-3xl text-ink"
                @click="closeMenu"
              >
                Contact
              </NuxtLink>
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { gsap } from 'gsap'

const scrolled = ref(false)
const menuOpen = ref(false)

const { prefersReducedMotion } = usePrefersReducedMotion()

function onScroll() {
  scrolled.value = window.scrollY > 60
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

watch(menuOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (!open || prefersReducedMotion.value) return
  await nextTick()
  const links = document.querySelectorAll<HTMLElement>(
    '#mobile-nav .mobile-nav-link',
  )
  if (!links.length) return
  gsap.fromTo(
    links,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.12,
    },
  )
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.nav-link {
  position: relative;
  text-decoration: none;
  color: var(--color-ink);
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-link::after {
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

.nav-link:hover::after,
.nav-link.router-link-active::after {
  transform: scaleX(1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
