// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: [
    '~/assets/sass/style.scss'
  ],
  plugins: [
    // adobe fonts
    '~/plugins/adobeFont.js'
  ],
  app: {
    head: {
      link: [
        {
          // reset css
          rel: "stylesheet",
          href: "https://unpkg.com/destyle.css@3.0.2/destyle.min.css"
        },
        {
          // fontawesome
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        },
      ],
    }
  }
})