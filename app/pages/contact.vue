<template>
  <div
    class="mx-auto max-w-contact px-5 py-28 md:px-8 md:py-36"
  >
    <section aria-labelledby="contact-heading">
      <h1
        id="contact-heading"
        class="font-display text-3xl text-ink"
      >
        Say hello.
      </h1>

      <div class="mt-10 flex flex-wrap items-center gap-3">
        <a
          :href="`mailto:${profile.email}`"
          class="font-sans text-lg text-ink transition-colors duration-200 hover:text-accent"
        >
          {{ profile.email }}
        </a>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent"
          :aria-label="copied ? 'Copied' : 'Copy email'"
          @click="copyEmail"
        >
          <Check
            v-if="copied"
            :size="18"
            stroke-width="1.5"
          />
          <Copy
            v-else
            :size="18"
            stroke-width="1.5"
          />
        </button>
      </div>

      <Transition name="toast">
        <p
          v-if="toast"
          class="mt-2 font-mono text-xs text-ink-muted"
          role="status"
        >
          Copied!
        </p>
      </Transition>

      <ul
        class="mt-12 flex flex-wrap gap-8"
        role="list"
      >
        <li>
          <a
            :href="profile.social.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 font-sans text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            <Github :size="18" stroke-width="1.5" />
            GitHub
          </a>
        </li>
        <li>
          <a
            :href="profile.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 font-sans text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            <Linkedin :size="18" stroke-width="1.5" />
            LinkedIn
          </a>
        </li>
      </ul>

      <p
        class="mt-10 inline-flex items-center gap-2 rounded-full bg-tag-bg px-3 py-1.5 font-mono text-xs text-ink-muted"
      >
        <span
          class="h-2 w-2 rounded-full bg-[#22C55E]"
          aria-hidden="true"
        />
        Open to opportunities
      </p>
    </section>

    <section
      class="mt-20"
      aria-label="Contact form"
    >
      <ContactForm />
    </section>
  </div>
</template>

<script setup lang="ts">
import { Check, Copy, Github, Linkedin } from 'lucide-vue-next'
import profileJson from '~/content/profile.json'
import type { Profile } from '~/types/content'

definePageMeta({
  layout: 'default',
})

const profile = profileJson as Profile

const copied = ref(false)
const toast = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | null = null

function copyEmail() {
  if (!import.meta.client) return
  void navigator.clipboard.writeText(profile.email)
  copied.value = true
  toast.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    copied.value = false
    toast.value = false
  }, 2000)
}

useSeoMeta({
  title: 'Contact',
  description: 'Get in touch for collaborations and opportunities.',
})

onUnmounted(() => {
  if (toastTimer) clearTimeout(toastTimer)
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
}
</style>
