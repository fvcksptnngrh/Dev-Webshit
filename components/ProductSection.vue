<template>
  <section class="product-section">
    <div class="section-header">
      <h3 class="section-title">{{ title }}</h3>
    </div>
    <div v-if="loading" class="state text-center">Memuat produk…</div>
    <div v-else-if="error" class="state text-center text-danger">{{ error }}</div>
    <div v-else class="grid">
      <ProductCard
        v-for="p in visible"
        :key="p.id"
        :product="p"
        @added="$emit('added', $event)"
        @qty-changed="$emit('qty-changed', $event)"
        @removed="$emit('removed', $event)"
        @open-detail="$emit('open-detail', $event)"
      />
    </div>
    <div v-if="showMoreAvailable" class="more">
      <button class="btn-more" @click="expanded = !expanded">
        {{ expanded ? 'Lihat Lebih Sedikit' : 'Lihat Selengkapnya' }}
      </button>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, watch } from '@nuxtjs/composition-api'
import ProductCard from '~/components/ProductCard.vue'

export default {
  name: 'ProductSection',
  components: { ProductCard },
  emits: ['added', 'qty-changed', 'removed', 'open-detail'],
  props: {
    title: { type: String, required: true },
    limit: { type: Number, default: 18 },
    skip: { type: Number, default: 0 },
    initial: { type: Number, default: 6 }
  },
  setup(props) {
    const products = ref([])
    const loading = ref(true)
    const error = ref('')
    const expanded = ref(false)

    const visible = computed(() =>
      expanded.value ? products.value : products.value.slice(0, props.initial)
    )
    const showMoreAvailable = computed(() => products.value.length > props.initial)

    onMounted(fetchData)
    watch(() => [props.limit, props.skip], fetchData)

    async function fetchData() {
      loading.value = true; error.value = ''; products.value = []
      try {
        const res = await fetch(`https://dummyjson.com/products?limit=${props.limit}&skip=${props.skip}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        products.value = (data.products || []).map(p => ({
          id: p.id, 
          title: p.title, 
          brand: p.brand,
          description: p.description,
          price: p.price, 
          discountPercentage: p.discountPercentage,
          rating: p.rating, 
          thumbnail: p.thumbnail
        }))
      } catch (e) {
        error.value = 'Gagal memuat produk.'
      } finally {
        loading.value = false
      }
    }

    return { products, loading, error, expanded, visible, showMoreAvailable }
  }
}
</script>

<style scoped>
.product-section { 
  max-width: 1200px; 
  margin: 0 auto 32px; 
  padding: 0 12px; 
}

.section-header { 
  margin: 8px 0 14px; 
}

.section-title { 
  font-size: 24px; 
  font-weight: 700; 
  margin: 0; 
}

.grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:20px;
  align-items:stretch;
}

@media (min-width: 576px){ .grid{ grid-template-columns:repeat(3,1fr);} }
@media (min-width: 1200px){ .grid{ grid-template-columns:repeat(6,1fr);} }

.more{ 
  text-align:center; 
  margin-top:14px; 
}

.btn-more{ 
  background:none; 
  border:none; 
  color:#1976d2; 
  cursor:pointer; 
  font-weight:600; 
}

.state{ 
  padding:24px 0; 
}

</style>