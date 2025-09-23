import { componentsPlugin } from "bootstrap-vue";

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  '@nuxtjs/composition-api/module',
  ['bootstrap-vue/nuxt',{
    componentsPlugin: [
      'NavbarPlugin',
      'ButtonPlugin',
      'CarouselPlugin',
      'ImagePlugin'
    ],
    component: [
      'Bnav',
      'BNavbar',
      'Bcontainer',
      'Bbtn',
      'Bcarousel',
      'Bimg'
    ]
      }
    ]
  ],
  
  bootstrapVue: {
    icons: true,
    bootstrapCSS: true,     // pastikan tidak false
    bootstrapVueCSS: true   // pastikan tidak false
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      compact: true,
      generatorOpts: {
        maxSize: 1000000
      }
    },
    extend (config, ctx) {
    }
  }
}
