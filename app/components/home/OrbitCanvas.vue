<template>
  <div
    ref="containerRef"
    class="orbit-canvas-container"
    aria-hidden="true"
  >
    <canvas ref="canvasRef" class="orbit-canvas" />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const { prefersReducedMotion } = usePrefersReducedMotion()

interface OrbitalRing {
  radius: number
  speed: number
  tilt: number
  phase: number
  strokeOpacity: number
  strokeWidth: number
}

interface OrbitalDot {
  ringIndex: number
  angleOffset: number
  size: number
  opacity: number
  trailLength: number
}

function resolveColor(variable: string): string {
  if (typeof window === 'undefined') return '#888'
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim() || '#888'
}

function hexToRgb(color: string): string {
  const trimmed = color.trim()

  if (/^\d/.test(trimmed) && trimmed.includes(' ')) {
    return trimmed.split(' ').join(',')
  }

  const rgbMatch = trimmed.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (rgbMatch?.[1] && rgbMatch[2] && rgbMatch[3]) return `${rgbMatch[1]},${rgbMatch[2]},${rgbMatch[3]}`

  const hexMatch = trimmed.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (hexMatch?.[1] && hexMatch[2] && hexMatch[3]) {
    return `${parseInt(hexMatch[1], 16)},${parseInt(hexMatch[2], 16)},${parseInt(hexMatch[3], 16)}`
  }

  return '140,140,140'
}

onMounted(() => {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return

  const ctx = canvas.getContext('2d')!
  if (!ctx) return

  const resize = () => {
    const dpr = window.devicePixelRatio || 1
    const w = container.clientWidth
    const h = container.clientHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(container)

  const inkFaint = resolveColor('--color-ink-faint') || 'rgba(120,120,120,0.6)'
  const rgb = hexToRgb(inkFaint)

  const rings: OrbitalRing[] = [
    { radius: 190, speed: 0.08, tilt: 0.10, phase: 0,              strokeOpacity: 0.07, strokeWidth: 1.0 },
    { radius: 155, speed: 0.15, tilt: 0.28, phase: Math.PI * 0.4,  strokeOpacity: 0.11, strokeWidth: 0.9 },
    { radius: 118, speed: 0.26, tilt: 0.58, phase: Math.PI * 1.1,  strokeOpacity: 0.16, strokeWidth: 0.7 },
    { radius: 84,  speed: 0.42, tilt: 0.88, phase: Math.PI * 0.7,  strokeOpacity: 0.22, strokeWidth: 0.6 },
    { radius: 52,  speed: 0.68, tilt: 1.15, phase: Math.PI * 1.5,  strokeOpacity: 0.30, strokeWidth: 0.5 },
    { radius: 28,  speed: 1.10, tilt: 0.40, phase: Math.PI * 0.2,  strokeOpacity: 0.38, strokeWidth: 0.4 },
  ]

  const dots: OrbitalDot[] = [
    { ringIndex: 0, angleOffset: 0,              size: 3.2, opacity: 0.55, trailLength: 22 },
    { ringIndex: 1, angleOffset: 0,              size: 3.6, opacity: 0.70, trailLength: 36 },
    { ringIndex: 1, angleOffset: Math.PI,        size: 2.2, opacity: 0.40, trailLength: 18 },
    { ringIndex: 2, angleOffset: 0,              size: 3.0, opacity: 0.80, trailLength: 40 },
    { ringIndex: 2, angleOffset: Math.PI * 0.65, size: 1.8, opacity: 0.38, trailLength: 14 },
    { ringIndex: 3, angleOffset: 0,              size: 2.8, opacity: 0.85, trailLength: 32 },
    { ringIndex: 3, angleOffset: Math.PI * 1.3,  size: 1.6, opacity: 0.42, trailLength: 16 },
    { ringIndex: 4, angleOffset: 0,              size: 2.4, opacity: 0.90, trailLength: 26 },
    { ringIndex: 5, angleOffset: 0,              size: 2.0, opacity: 0.95, trailLength: 20 },
    { ringIndex: 0, angleOffset: Math.PI * 1.7,  size: 1.4, opacity: 0.30, trailLength: 10 },
  ]

  const trails: Array<{ x: number; y: number }[]> = dots.map(() => [])

  let startTime: number | null = null
  let rafId: number | null = null

  function projectPoint(ring: OrbitalRing, angle: number, cx: number, cy: number) {
    const x3 = ring.radius * Math.cos(angle)
    const y3 = ring.radius * Math.sin(angle)
    return { x: cx + x3, y: cy + y3 * Math.cos(ring.tilt) }
  }

  function drawRing(ring: OrbitalRing, cx: number, cy: number, t: number) {
    const steps = 180
    ctx.beginPath()
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2 + ring.phase + t * ring.speed
      const { x, y } = projectPoint(ring, angle, cx, cy)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.strokeStyle = `rgba(${rgb},${ring.strokeOpacity})`
    ctx.lineWidth = ring.strokeWidth
    ctx.stroke()
  }

  function drawDot(dot: OrbitalDot, dotIndex: number, ring: OrbitalRing, angle: number, cx: number, cy: number) {
    const { x, y } = projectPoint(ring, angle, cx, cy)

    const trail = trails[dotIndex] ?? []
    trail.push({ x, y })
    if (trail.length > dot.trailLength) trail.shift()
    trails[dotIndex] = trail

    if (trail.length > 1) {
      for (let i = 1; i < trail.length; i++) {
        const prev = trail[i - 1]
        const curr = trail[i]
        if (!prev || !curr) continue
        const progress = i / trail.length
        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(curr.x, curr.y)
        ctx.strokeStyle = `rgba(${rgb},${dot.opacity * progress * 0.5})`
        ctx.lineWidth = dot.size * progress * 0.75
        ctx.lineCap = 'round'
        ctx.stroke()
      }
    }

    // Outer glow
    const halo = ctx.createRadialGradient(x, y, 0, x, y, dot.size * 5)
    halo.addColorStop(0, `rgba(${rgb},${dot.opacity * 0.4})`)
    halo.addColorStop(1, `rgba(${rgb},0)`)
    ctx.beginPath()
    ctx.arc(x, y, dot.size * 5, 0, Math.PI * 2)
    ctx.fillStyle = halo
    ctx.fill()

    // Core
    ctx.beginPath()
    ctx.arc(x, y, dot.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${rgb},${dot.opacity})`
    ctx.fill()
  }

  function drawCore(cx: number, cy: number, t: number) {
    const pulse = 1 + 0.22 * Math.sin(t * 1.3)
    const r = 6 * pulse

    // Wide ambient bloom
    const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 9)
    bloom.addColorStop(0, `rgba(${rgb},0.22)`)
    bloom.addColorStop(0.4, `rgba(${rgb},0.07)`)
    bloom.addColorStop(1, `rgba(${rgb},0)`)
    ctx.beginPath()
    ctx.arc(cx, cy, r * 9, 0, Math.PI * 2)
    ctx.fillStyle = bloom
    ctx.fill()

    // Inner glow
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 3)
    glow.addColorStop(0, `rgba(${rgb},0.65)`)
    glow.addColorStop(1, `rgba(${rgb},0)`)
    ctx.beginPath()
    ctx.arc(cx, cy, r * 3, 0, Math.PI * 2)
    ctx.fillStyle = glow
    ctx.fill()

    // Solid core
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${rgb},0.80)`
    ctx.fill()
  }

  function tick(ts: number) {
    if (startTime === null) startTime = ts
    const t = (ts - startTime) / 1000

    const dpr = window.devicePixelRatio || 1
    const w = canvas!.width / dpr
    const h = canvas!.height / dpr
    const cx = w / 2
    const cy = h / 2

    ctx.clearRect(0, 0, w, h)

    rings.forEach(ring => drawRing(ring, cx, cy, t))

    dots.forEach((dot, i) => {
      const ring = rings[dot.ringIndex]
      if (!ring) return
      const angle = ring.phase + t * ring.speed + dot.angleOffset
      drawDot(dot, i, ring, angle, cx, cy)
    })

    drawCore(cx, cy, t)

    rafId = requestAnimationFrame(tick)
  }

  if (!prefersReducedMotion.value) {
    rafId = requestAnimationFrame(tick)
    gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 1.8, ease: 'power2.out', delay: 0.3 })
  }
  else {
    // Static render for reduced motion
    tick(0)
    canvas.style.opacity = '0.4'
  }

  onUnmounted(() => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    ro.disconnect()
  })
})
</script>

<style scoped>
.orbit-canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: inherit;
}

.orbit-canvas {
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
