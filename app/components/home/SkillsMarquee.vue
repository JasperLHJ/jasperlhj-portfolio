<template>
  <section
    class="border-y border-border bg-cream py-8"
    aria-label="Skills and technologies"
  >
    <div class="marquee-row overflow-hidden py-2">
      <div class="marquee-track font-mono text-sm text-ink-muted">
        <span
          v-for="n in 2"
          :key="'a' + n"
          class="whitespace-nowrap px-6"
        >
          {{ row1 }}&nbsp;&nbsp;&nbsp;
        </span>
      </div>
    </div>
    <div class="marquee-row overflow-hidden py-2">
      <div class="marquee-track marquee-track--reverse font-mono text-sm text-ink-muted">
        <span
          v-for="n in 2"
          :key="'b' + n"
          class="whitespace-nowrap px-6"
        >
          {{ row2 }}&nbsp;&nbsp;&nbsp;
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const row1 =
  'NuxtJS · VueJS · Laravel · TypeScript · PHP · TailwindCSS · REST APIs'
const row2 =
  'Docker · AWS EC2 · Stripe API · Google Maps API · MySQL · PostgreSQL · CI/CD'
</script>
