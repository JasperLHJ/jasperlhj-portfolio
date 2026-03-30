import type { Context, TweenVars } from 'gsap'

type ScrollRevealVars = TweenVars & {
  scrollTrigger?: {
    trigger?: Element | string | null
    start?: string
    end?: string
    once?: boolean
  }
}

export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  vars: ScrollRevealVars = {},
) {
  const { prefersReducedMotion } = usePrefersReducedMotion()
  let ctx: Context | null = null

  onMounted(async () => {
    if (prefersReducedMotion.value) return
    const el = target.value
    if (!el) return

    const { gsap } = await import('gsap')
    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    ScrollTrigger.refresh()

    const {
      scrollTrigger: stOverrides,
      ...tweenVars
    } = vars

    ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 36,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          scroller: document.documentElement,
          ...stOverrides,
        },
        ...tweenVars,
      })
    }, el)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
