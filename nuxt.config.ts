// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  modules: ['@nuxt/image', '@nuxtjs/google-fonts', '@nuxtjs/tailwindcss', 'nuxt-og-image', '@nuxtjs/sitemap'],
  site: {
    url: 'https://jasperlhj.com',
    name: 'Jasper Lee Hau Jun',
  },
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
    contactToEmail: 'jasperleehaujun88@gmail.com',
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Jasper Lee Hau Jun — Full Stack Developer',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-8NZTE57CK1',
          async: true,
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8NZTE57CK1');`,
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Malaysia-based Full Stack Developer specializing in NuxtJS and Laravel. Building fast, scalable web applications for Malaysian businesses and beyond.',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  image: {
    format: ['webp'],
  },
})
