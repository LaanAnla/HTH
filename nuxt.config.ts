// https://nuxt.com/docs/api/configuration/nuxt-config
import dotenv from 'dotenv'
dotenv.config()

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxt/content', '@nuxt/image'],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [
        '/',
        '/signup',
        '/tarifs',
        '/legal',
        '/legal/confidentialite',
        '/legal/cgu',
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL || 'https://api.francetravail.io',
    },
    apiClientID: process.env.API_CLIENT_ID,
    apiClientSecret: process.env.API_CLIENT_SECRET,
    apiScope: process.env.API_SCOPE,
  },
  ui: {
    icons: ['heroicons', 'simple-icons', 'fa6-brands'],
  },
  nitro: {
    prerender: {
      routes: ['/api/search.json'],
    },
  },
})
