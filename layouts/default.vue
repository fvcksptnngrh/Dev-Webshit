
<template>
  <div class="app-root" :class="{ 'is-dimmed': isDimmed }">
    <TopNavbar />
    <Navbar
     @search-focus="toggleDim"
     @open-detail="handleProductSelected"
      />
    <div v-if="isDimmed" class="app-dim-overlay" @click="toggleDim(false)"></div>
    <main class="app-content">
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import { ref } from '@nuxtjs/composition-api'
import Navbar from '~/components/Navbar.vue'
import TopNavbar from '~/components/TopNavbar.vue'
import Footer from '~/components/Footer.vue'


export default {
  components: { Navbar, TopNavbar, Footer },
  setup() {
    const isDimmed = ref(false)
    const toggleDim = (val) => {
      isDimmed.value = !!val
    }
    return { isDimmed, toggleDim }
  },
  methods: {
  handleProductSelected(product) {
    console.log('Product selected in layout:', product)
    this.$nuxt.$emit('product-selected', product)
    }
  }
}
</script>

<style>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

html, body, #__nuxt, #__layout, .app-root {
  overflow: visible;
  height: auto;
  min-height: 100%;
  margin: 0;
  padding: 0;
}

.app-content {
  position: relative;
  z-index: 1; 
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.app-dim-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 900;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

</style>