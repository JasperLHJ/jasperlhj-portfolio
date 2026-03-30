export function usePrefersReducedMotion() {
  const prefersReducedMotion = ref(false)

  function update() {
    if (!import.meta.client) return
    prefersReducedMotion.value = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
  }

  onMounted(() => {
    update()
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener('change', update)
    onUnmounted(() => mq.removeEventListener('change', update))
  })

  return { prefersReducedMotion }
}
