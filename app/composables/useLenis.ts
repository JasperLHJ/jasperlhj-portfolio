import type Lenis from 'lenis'

export function useLenis() {
  const nuxtApp = useNuxtApp()
  return computed(() => (nuxtApp.$lenis ?? null) as Lenis | null)
}
