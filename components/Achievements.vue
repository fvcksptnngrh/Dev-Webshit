<template>
  <b-container fluid class="achievements-section p-0">
    <img :src="src" :alt="alt" class="achievements-img" loading="eager" />
  </b-container>
</template>

<script>
export default {
  name: 'Achievements',
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: 'Achievements Banner' }
  }
}
</script>

<style scoped>
.achievements-section { padding: 0; }

.achievements-img{
  display: block;
  width: 100%;
  height: auto;
  max-height: 380px;
  object-fit: cover;
  object-position: center;
}

@media (max-width: 992px){
  .achievements-img{ max-height: 300px; }
}
@media (max-width: 576px){
  .achievements-img{ max-height: 220px; }
}

</style>