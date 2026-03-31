// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxtjs/google-fonts', '@nuxtjs/tailwindcss'],
  googleFonts: {
    families: {
      'Cormorant Garamond': [300, 400],
      'DM Sans': [300, 400, 500],
      'DM Mono': [400],
    },
    display: 'swap',
  },
  runtimeConfig: {
    resendApiKey: '',
    contactToEmail: 'hello@jasperlhj.dev',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Jasper Lee Hau Jun — Full Stack Developer',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Full Stack Developer specializing in NuxtJS and Laravel. Building fast, scalable, and beautiful web applications.',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  image: {
    format: ['webp'],
  },
})
