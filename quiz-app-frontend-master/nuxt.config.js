export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'QuizApp',
    titleTemplate: '%s | QuizApp UCLL',
    htmlAttrs: {
      lang: 'nl-BE'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src:'~/plugins/tailwindElements.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://i18n.nuxtjs.org
    '@nuxtjs/i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    credentials: true,
  },

  proxy: {
    '/api': {
      changeOrigin: false,
      target: process.env.API_SERVER_URL,
      xfwd: true
    }
  },

  i18n: {
    locales: [
      {
        code: 'nl',
        iso: 'nl-BE',
        file: 'nl-BE.js',
        name: 'Nederlands'
      },
      {
        code: 'en',
        iso: 'en-UK',
        file: 'en-UK.js',
        name: 'English'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'nl',
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'nl',
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      });
    }
  },

  server: {
    host: '0.0.0.0'
  }
}
