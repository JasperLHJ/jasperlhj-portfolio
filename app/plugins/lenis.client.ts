import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const reduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduced) {
    return { provide: { lenis: null as Lenis | null } }
  }

  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value, { immediate: true })
      }
      return lenis.animatedScroll
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
    pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
  })

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  ScrollTrigger.refresh()

  return {
    provide: {
      lenis,
    },
  }
})
