<template>
  <Teleport to="body">
    <Transition name="privacy-backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
        @click.self="close"
      >
        <div
          class="absolute inset-0 bg-ink/40"
          aria-hidden="true"
        />

        <div
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          class="privacy-panel relative z-10 flex h-[min(90vh,820px)] max-h-[min(90vh,820px)] w-full max-w-2xl flex-col rounded-t-2xl border border-border bg-cream shadow-lg sm:rounded-2xl"
          @keydown.escape="close"
        >
            <header class="shrink-0 border-b border-border px-5 py-4 md:px-6">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2
                    :id="titleId"
                    class="font-display text-2xl text-ink"
                  >
                    {{ content.dialogTitle }}
                  </h2>
                  <p class="mt-1 font-mono text-xs text-ink-muted">
                    {{ content.lastUpdated }}
                  </p>
                </div>
                <button
                  ref="closeBtnRef"
                  type="button"
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                  aria-label="Close privacy policy"
                  @click="close"
                >
                  <X :size="18" stroke-width="1.5" />
                </button>
              </div>

              <div
                class="mt-4 flex gap-1 rounded-full bg-tag-bg p-1"
                role="tablist"
                aria-label="Privacy policy language"
              >
                <button
                  v-for="tab in localeTabs"
                  :key="tab.id"
                  type="button"
                  role="tab"
                  :aria-selected="locale === tab.id"
                  class="flex-1 rounded-full px-3 py-1.5 font-mono text-xs transition-colors duration-200"
                  :class="locale === tab.id
                    ? 'bg-ink text-cream'
                    : 'text-ink-muted hover:text-ink'"
                  @click="locale = tab.id"
                >
                  {{ tab.label }}
                </button>
              </div>
            </header>

            <div
              data-lenis-prevent
              class="privacy-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 md:px-6 md:py-6"
              tabindex="0"
            >
              <article class="space-y-8">
                <section
                  v-for="(section, index) in content.sections"
                  :key="`${locale}-${index}`"
                >
                  <h3 class="font-sans text-sm font-medium text-ink">
                    {{ section.title }}
                  </h3>
                  <p
                    v-for="(paragraph, pIndex) in section.paragraphs"
                    :key="`p-${pIndex}`"
                    class="mt-2 font-sans text-sm leading-relaxed text-ink-muted"
                  >
                    {{ paragraph }}
                  </p>
                  <ul
                    v-if="section.list?.length"
                    class="mt-2 list-disc space-y-2 pl-5 font-sans text-sm leading-relaxed text-ink-muted"
                  >
                    <li
                      v-for="(item, lIndex) in section.list"
                      :key="`l-${lIndex}`"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </section>
              </article>
            </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { privacyPolicy, type PrivacyLocale } from '~/content/privacy-policy'

const { isOpen, close } = usePrivacyPolicyDialog()
const lenis = useLenis()

const locale = ref<PrivacyLocale>('en')
const panelRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
const titleId = 'privacy-policy-dialog-title'

const localeTabs = [
  { id: 'en' as const, label: 'English' },
  { id: 'ms' as const, label: 'Bahasa Malaysia' },
]

const content = computed(() => privacyPolicy[locale.value])

let previousActive: HTMLElement | null = null

watch(isOpen, (open) => {
  if (!import.meta.client) return
  if (open) {
    previousActive = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    lenis.value?.stop()
    nextTick(() => closeBtnRef.value?.focus())
  }
  else {
    document.body.style.overflow = ''
    lenis.value?.start()
    previousActive?.focus()
    previousActive = null
  }
})

onUnmounted(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  lenis.value?.start()
})
</script>

<style scoped>
.privacy-backdrop-enter-active,
.privacy-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.privacy-backdrop-enter-from,
.privacy-backdrop-leave-to {
  opacity: 0;
}

.privacy-backdrop-enter-active .privacy-panel,
.privacy-backdrop-leave-active .privacy-panel {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.privacy-backdrop-enter-from .privacy-panel,
.privacy-backdrop-leave-to .privacy-panel {
  opacity: 0;
  transform: translateY(16px);
}

@media (min-width: 640px) {
  .privacy-backdrop-enter-from .privacy-panel,
  .privacy-backdrop-leave-to .privacy-panel {
    transform: translateY(8px) scale(0.98);
  }
}

.privacy-scroll {
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
}
</style>
