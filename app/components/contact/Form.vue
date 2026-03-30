<template>
  <div>
    <Transition name="fade-form">
      <form
        v-if="!successPhase"
        ref="formRef"
        class="space-y-10"
        novalidate
        @submit.prevent="onSubmit"
      >
        <div
          v-for="field in fieldOrder"
          :key="field"
          :ref="(el) => setFieldWrapRef(el as HTMLElement | null, field)"
        >
          <div
            v-if="field !== 'message'"
            class="relative pt-2"
          >
            <Field
              :name="field"
              v-slot="{ field: f, errorMessage, meta }"
            >
              <input
                :id="field"
                v-bind="f"
                :type="field === 'email' ? 'email' : 'text'"
                autocomplete="off"
                class="peer w-full border-0 border-b border-border bg-transparent py-3 font-sans text-base text-ink outline-none transition-[border-color] duration-200 focus:border-accent"
                :class="field === 'email' ? 'lowercase' : ''"
                placeholder=" "
              />
              <label
                :for="field"
                class="pointer-events-none absolute left-0 top-6 origin-left font-sans text-base text-ink-muted transition-all duration-200 peer-focus:top-0 peer-focus:scale-[0.72] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.72]"
              >
                {{ labels[field] }}
              </label>
              <p
                v-if="errorMessage && meta.touched"
                class="mt-1 font-mono text-xs text-ink-muted"
              >
                {{ errorMessage }}
              </p>
            </Field>
          </div>

          <div
            v-else
            class="relative pt-2"
          >
            <Field
              name="message"
              v-slot="{ field: f, errorMessage, meta }"
            >
              <textarea
                id="message"
                v-bind="f"
                rows="1"
                class="peer min-h-[120px] w-full resize-none border-0 border-b border-border bg-transparent py-3 font-sans text-base text-ink outline-none transition-[border-color] duration-200 focus:border-accent"
                placeholder=" "
                @input="autoResize"
              />
              <label
                for="message"
                class="pointer-events-none absolute left-0 top-6 origin-left font-sans text-base text-ink-muted transition-all duration-200 peer-focus:top-0 peer-focus:scale-[0.72] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.72]"
              >
                {{ labels.message }}
              </label>
              <p
                v-if="errorMessage && meta.touched"
                class="mt-1 font-mono text-xs text-ink-muted"
              >
                {{ errorMessage }}
              </p>
            </Field>
          </div>
        </div>

        <button
          type="submit"
          class="relative w-full overflow-hidden py-4 font-sans text-base font-medium transition-[background-color,color,transform] duration-200 disabled:opacity-60"
          :class="buttonClass"
          :disabled="status === 'loading'"
        >
          <span
            v-if="status === 'idle'"
            class="block"
          >Send message</span>
          <span
            v-else-if="status === 'loading'"
            class="flex items-center justify-center gap-2"
          >
            <span class="btn-spinner" />
          </span>
          <span
            v-else-if="status === 'success'"
            class="block"
          >Sent ✓</span>
          <span
            v-else-if="status === 'error'"
            class="block"
          >Something went wrong</span>
        </button>
      </form>
    </Transition>

    <Transition name="fade-thanks">
      <p
        v-if="successPhase"
        ref="thanksRef"
        class="py-12 text-center font-display text-2xl text-ink"
      >
        Thanks, I'll be in touch.
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Field, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { gsap } from 'gsap'
import { z } from 'zod'

const schema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Please enter your name').max(200),
    email: z.string().email('Valid email required'),
    message: z.string().min(10, 'Please write a bit more').max(10000),
  }),
)

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const labels = {
  name: 'Name',
  email: 'Email',
  message: 'Message',
} as const

const fieldOrder = ['name', 'email', 'message'] as const

const formRef = ref<HTMLFormElement | null>(null)
const fieldWrapRefs: Partial<Record<string, HTMLElement | null>> = {}
const thanksRef = ref<HTMLElement | null>(null)

function setFieldWrapRef(el: HTMLElement | null, key: string) {
  if (el) fieldWrapRefs[key] = el
  else delete fieldWrapRefs[key]
}

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const successPhase = ref(false)

const buttonClass = computed(() => {
  if (status.value === 'success') return 'bg-emerald-600 text-white'
  if (status.value === 'error') return 'bg-ink text-cream animate-shake'
  return 'bg-ink text-cream hover:bg-ink-muted'
})

const { prefersReducedMotion } = usePrefersReducedMotion()

function autoResize(e: Event) {
  const ta = e.target as HTMLTextAreaElement
  ta.style.height = 'auto'
  ta.style.height = `${Math.max(120, ta.scrollHeight)}px`
}

const onSubmit = handleSubmit(async (values) => {
  status.value = 'loading'
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: values,
    })
    status.value = 'success'
    resetForm()
    window.setTimeout(() => {
      successPhase.value = true
    }, 900)
  }
  catch {
    status.value = 'error'
    window.setTimeout(() => {
      status.value = 'idle'
    }, 2200)
  }
})

onMounted(() => {
  if (prefersReducedMotion.value) return
  nextTick(() => {
    const wraps = fieldOrder
      .map((k) => fieldWrapRefs[k])
      .filter(Boolean) as HTMLElement[]
    if (!wraps.length) return
    gsap.fromTo(
      wraps,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.15,
      },
    )
    const btn = formRef.value?.querySelector('button')
    if (btn) {
      gsap.fromTo(
        btn,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.45 },
      )
    }
  })
})

watch(successPhase, (v) => {
  if (!v || prefersReducedMotion.value) return
  nextTick(() => {
    const el = thanksRef.value
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      )
    }
  })
})
</script>

<style scoped>
.fade-form-enter-active,
.fade-form-leave-active {
  transition: opacity 0.45s ease;
}

.fade-form-enter-from,
.fade-form-leave-to {
  opacity: 0;
}

.fade-thanks-enter-active {
  transition: opacity 0.45s ease;
}

.fade-thanks-enter-from {
  opacity: 0;
}
</style>
