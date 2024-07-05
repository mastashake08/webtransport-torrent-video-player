// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  compatibilityDate: "2024-07-03",
  vite: {
    define: {
      global: {}
    }
  }
})