<template>
  <b-container fluid class="promo-section p-0">
    <img :src="src" :alt="alt" class="promo-img" loading="eager" />
  </b-container>
</template>

<script>
export default {
  name: 'GifSection',
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: 'Banner GIF' }
  }
}
</script>

<style scoped>
.promo-section { max-width: 1200px; margin: 0 auto; padding: 0 12px; }
.promo-img { display: block; width: 100%; height: auto; border-radius: 16px; }
</style>