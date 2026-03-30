<template>
  <div
    v-show="visible && !prefersReducedMotion"
    ref="cursorEl"
    class="pointer-events-none fixed left-0 top-0 z-[70] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink-faint mix-blend-multiply md:block"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
const cursorEl = ref<HTMLElement | null>(null)
const visible = ref(false)
const { prefersReducedMotion } = usePrefersReducedMotion()

let raf = 0
const pos = { x: 0, y: 0 }
const target = { x: 0, y: 0 }

function loop() {
  const el = cursorEl.value
  if (el) {
    pos.x += (target.x - pos.x) * 0.18
    pos.y += (target.y - pos.y) * 0.18
    el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
  }
  raf = requestAnimationFrame(loop)
}

function onMove(e: MouseEvent) {
  target.x = e.clientX
  target.y = e.clientY
  visible.value = true
}

function onLeave() {
  visible.value = false
}

onMounted(() => {
  if (window.matchMedia('(max-width: 767px)').matches) return
  if (prefersReducedMotion.value) return
  window.addEventListener('mousemove', onMove, { passive: true })
  document.body.addEventListener('mouseleave', onLeave)
  raf = requestAnimationFrame(loop)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  document.body.removeEventListener('mouseleave', onLeave)
  cancelAnimationFrame(raf)
})
</script>
