<template>
  <footer
    class="border-t border-border"
    role="contentinfo"
  >
    <div
      class="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-5 py-10 font-mono text-xs text-ink-muted md:grid-cols-3 md:items-center md:gap-4 md:px-8"
    >
      <p class="text-center md:text-left">
        © {{ year }} Jasper Lee Hau Jun
      </p>
      <p class="text-center">
        · Malaysia ·
      </p>
      <ul
        class="flex items-center justify-center gap-5 md:justify-end"
        role="list"
      >
        <li>
          <a
            :href="profile.social.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-ink-muted transition-colors duration-200 hover:text-accent"
            aria-label="GitHub"
          >
            <Github :size="18" stroke-width="1.5" />
          </a>
        </li>
        <li>
          <a
            :href="profile.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-ink-muted transition-colors duration-200 hover:text-accent"
            aria-label="LinkedIn"
          >
            <Linkedin :size="18" stroke-width="1.5" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Github, Linkedin } from 'lucide-vue-next'
import profileJson from '~/content/profile.json'
import type { Profile } from '~/types/content'

const profile = profileJson as Profile
const year = new Date().getFullYear()
</script>
