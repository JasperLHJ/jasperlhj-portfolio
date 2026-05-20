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
        class="link-row mt-12 flex flex-nowrap items-center gap-8 overflow-x-auto"
        role="list"
      >
        <li v-if="whatsappHref" class="shrink-0">
          <a
            :href="whatsappHref"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 font-sans text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            <MessageCircle :size="18" stroke-width="1.5" />
            WhatsApp
          </a>
        </li>
        <li class="shrink-0">
          <a
            :href="`mailto:${profile.email}`"
            class="inline-flex items-center gap-2 font-sans text-sm text-ink transition-colors duration-200 hover:text-accent"
          >
            <Mail :size="18" stroke-width="1.5" />
            Email
          </a>
        </li>
        <li class="shrink-0">
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
        <li class="shrink-0">
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

      <details class="disclosure group mt-14 border-t border-border pt-6">
        <summary
          class="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm transition-colors duration-200 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span>
            <span class="block font-sans text-sm font-medium text-ink group-open:text-ink">
              How we use your data
            </span>
            <span class="mt-0.5 block font-mono text-xs text-ink-muted">
              Bagaimana kami menggunakan data anda
            </span>
          </span>
          <ChevronDown
            :size="18"
            stroke-width="1.5"
            class="shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <div
          id="contact-disclosure-content"
          class="disclosure-panel mt-6 space-y-6 font-sans text-sm leading-relaxed text-ink-muted"
        >
          <div>
            <h3 class="font-medium text-ink">
              English
            </h3>
            <p class="mt-2">
              When you submit the contact form, we collect your <strong class="font-medium text-ink">name</strong>, <strong class="font-medium text-ink">email address</strong>, and <strong class="font-medium text-ink">message</strong> solely to respond to your enquiry and discuss potential work. Messages are sent to our email inbox via a third-party email service (Resend) and may be stored for as long as needed to handle your request.
            </p>
            <p class="mt-2">
              Data controller: <strong class="font-medium text-ink">{{ profile.name }}</strong>, based in {{ profile.location }}. Privacy enquiries:
              <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>.
              You must tick the consent checkbox on the form before submitting. For full details, including your rights under Malaysia’s PDPA, see our
              <button
                type="button"
                class="text-accent underline underline-offset-2 transition-colors duration-200 hover:text-accent-hover"
                @click="openPrivacyPolicy"
              >
                Privacy Policy
              </button>
              (available in English and Bahasa Malaysia).
            </p>
          </div>
          <div>
            <h3 class="font-medium text-ink">
              Bahasa Malaysia
            </h3>
            <p class="mt-2">
              Apabila anda menghantar borang hubungan, kami mengumpul <strong class="font-medium text-ink">nama</strong>, <strong class="font-medium text-ink">alamat e-mel</strong>, dan <strong class="font-medium text-ink">mesej</strong> anda hanya untuk membalas pertanyaan anda dan membincangkan kerja yang berpotensi. Mesej dihantar ke peti e-mel kami melalui perkhidmatan e-mel pihak ketiga (Resend) dan mungkin disimpan selama diperlukan untuk mengendalikan permintaan anda.
            </p>
            <p class="mt-2">
              Pengguna data: <strong class="font-medium text-ink">{{ profile.name }}</strong>, berpusat di {{ profile.location }}. Pertanyaan privasi:
              <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>.
              Anda mesti menanda kotak persetujuan pada borang sebelum menghantar. Untuk butiran penuh, termasuk hak anda di bawah APDP Malaysia, lihat
              <button
                type="button"
                class="text-accent underline underline-offset-2 transition-colors duration-200 hover:text-accent-hover"
                @click="openPrivacyPolicy"
              >
                Dasar Privasi
              </button>
              (tersedia dalam Bahasa Inggeris dan Bahasa Malaysia).
            </p>
          </div>
        </div>
      </details>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Check, ChevronDown, Copy, Github, Linkedin, Mail, MessageCircle } from 'lucide-vue-next'
import profileJson from '~/content/profile.json'
import type { Profile } from '~/types/content'

definePageMeta({
  layout: 'default',
})

const profile = profileJson as Profile
const { open: openPrivacyPolicy } = usePrivacyPolicyDialog()

const whatsappHref = computed(() => {
  const digits = (profile.whatsappPhone ?? '').replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : ''
})

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

const siteUrl = 'https://jasperlhj.com'
const pageTitle = 'Contact — Jasper Lee Hau Jun'
const pageDescription = 'Based in Malaysia and open to local and remote collaborations. Reach out for freelance projects, contract work, or full-time opportunities.'

useSeoMeta({
  title: 'Contact',
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: `${siteUrl}/contact`,
  ogSiteName: 'Jasper Lee Hau Jun',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/contact` }],
})

defineOgImage('NuxtSeo.takumi', {
  title: pageTitle,
  description: pageDescription,
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

.link-row {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.link-row::-webkit-scrollbar {
  display: none;
}

.disclosure summary::-webkit-details-marker {
  display: none;
}

.disclosure-panel {
  animation: disclosure-in 0.25s ease;
}

@keyframes disclosure-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .disclosure-panel {
    animation: none;
  }
}
</style>
