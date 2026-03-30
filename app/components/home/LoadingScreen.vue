<template>
  <Teleport to="body">
    <div
      v-if="show"
      ref="overlayRef"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        ref="initialsRef"
        class="font-display font-light tracking-[0.2em] text-hero text-ink"
        aria-hidden="true"
      >
        <span
          v-for="(ch, i) in letters"
          :key="i"
          class="inline-block"
        >{{ ch }}</span>
      </div>
      <div class="mt-10 h-px w-48 overflow-hidden bg-border md:w-64">
        <div
          ref="barRef"
          class="h-full w-0 bg-ink"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const emit = defineEmits<{
  done: []
}>()

const show = ref(true)
const letters = ['J', 'L']
const overlayRef = ref<HTMLElement | null>(null)
const initialsRef = ref<HTMLElement | null>(null)
const barRef = ref<HTMLElement | null>(null)

const { prefersReducedMotion } = usePrefersReducedMotion()

onMounted(() => {
  if (prefersReducedMotion.value) {
    show.value = false
    nextTick(() => emit('done'))
    return
  }

  const chars = initialsRef.value?.querySelectorAll('span') ?? []
  const bar = barRef.value
  const overlay = overlayRef.value

  const tl = gsap.timeline()

  tl.fromTo(
    chars,
    { opacity: 0, y: 14 },
    {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.12,
    },
  )

  if (bar) {
    tl.to(
      bar,
      {
        width: '100%',
        duration: 1.05,
        ease: 'power2.inOut',
      },
      0.12,
    )
  }

  const start = performance.now()
  const minTime = 1800
  let exited = false

  function runExit() {
    if (exited || !overlay) return
    exited = true
    const elapsed = performance.now() - start
    const wait = Math.max(0, minTime - elapsed)
    window.setTimeout(() => {
      gsap.to(overlay, {
        opacity: 0,
        y: -10,
        duration: 0.55,
        ease: 'power2.out',
        onComplete: () => {
          show.value = false
          nextTick(() => emit('done'))
        },
      })
    }, wait)
  }

  if (document.readyState === 'complete') {
    runExit()
  }
  else {
    window.addEventListener('load', runExit, { once: true })
  }

  window.setTimeout(runExit, minTime + 400)
})
</script>
