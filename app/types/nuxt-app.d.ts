import type Lenis from 'lenis'

declare module '#app' {
  interface NuxtApp {
    $lenis: Lenis | null
    $gsap: typeof import('gsap').gsap
    $ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger
  }
}

export {}
