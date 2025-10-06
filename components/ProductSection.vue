<template>
  <section class="product-section">
    <div class="section-header">
      <h3 class="section-title">{{ title }}</h3>
      <div class="sort-dropdown-wrapper">
        <button class="sort-btn" @click="showSortDropdown = !showSortDropdown">
          <b-icon icon="arrow-down-up" /> {{ sortLabel }}
        </button>
        <div v-if="showSortDropdown" class="sort-dropdown">
          <div class="sort-item" @click="setSort('default')">
            <b-icon icon="list" class="sort-icon" />
            <span>Default</span>
          </div>
          <div class="sort-item" @click="setSort('asc')">
            <b-icon icon="arrow-down" class="sort-icon" />
            <span>Harga Terendah</span>
          </div>
          <div class="sort-item" @click="setSort('desc')">
            <b-icon icon="arrow-up" class="sort-icon" />
            <span>Harga Tertinggi</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="state text-center">Memuat produk…</div>
    <div v-else-if="error" class="state text-center text-danger">{{ error }}</div>
    <div v-else class="grid">
      <ProductCard
        v-for="p in sortedVisible"
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
import { BIcon, BIconArrowDownUp, BIconArrowDown, BIconArrowUp, BIconList } from 'bootstrap-vue'

export default {
  name: 'ProductSection',
  components: { 
    ProductCard,
    'b-icon': BIcon,
    'b-icon-arrow-down-up': BIconArrowDownUp,
    'b-icon-arrow-down': BIconArrowDown,
    'b-icon-arrow-up': BIconArrowUp,
    'b-icon-list': BIconList
  },
  emits: ['added', 'qty-changed', 'removed', 'open-detail'],
  props: {
    title: { type: String, required: true },
    limit: { type: Number, default: 18 },
    skip: { type: Number, default: 0 },
    initial: { type: Number, default: 6 },
    sortOrder: { type: String, default: 'default' }
  },
  setup(props) {
    const products = ref([])
    const loading = ref(true)
    const error = ref('')
    const expanded = ref(false)
    const showSortDropdown = ref(false)
    const sortOrder = ref(props.sortOrder)
    const sortLabel = computed(() => {
      if (sortOrder.value === 'asc') return 'Harga Terendah'
      if (sortOrder.value === 'desc') return 'Harga Tertinggi'
      return 'Default'
    })
    const setSort = (order) => {
      sortOrder.value = order
      showSortDropdown.value = false
    }

    const visible = computed(() =>
      expanded.value ? products.value : products.value.slice(0, props.initial)
    )
    const showMoreAvailable = computed(() => products.value.length > props.initial)

    const sortedVisible = computed(() => {
  let arr = visible.value
  if (sortOrder.value === 'default') return arr
  return [...arr].sort((a, b) => {
    if (sortOrder.value === 'desc') return b.price - a.price
    if (sortOrder.value === 'asc') return a.price - b.price
    return 0
  })
})
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

    return { 
      products, 
      loading, 
      error,
      expanded, 
      visible, 
      showMoreAvailable, 
      sortedVisible, 
      showSortDropdown,
      sortOrder,
      sortLabel,
      setSort 
    }
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
  gap : 40px;
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

.sort-dropdown-wrapper {
  display: inline-block;
  margin-left: 24px;
}
.sort-select {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #eaeaea;
  font-size: 1rem;
}

.sort-dropdown-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.sort-btn {
  background: #fff;
  border: 1.5px solid #e4e0e0;
  border-radius: 8px;
  padding: 8px 24px;
  font-size: 1rem;
  font-weight: 500;
  color: #fd0000;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px #0001;
  transition: border-color 0.2s, color 0.2s;
}

.sort-dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  min-width: 180px;
  z-index: 10;
  padding: 8px 0;
  border: 1px solid #fd0000;
}

.sort-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 1rem;
  color: #e53935;
  transition: background 0.15s;
}

.sort-item:hover {
  background: #f5f7fa;
}

.sort-icon {
  font-size: 1.2em;
}

</style>