<template>
  <div class="grid-wrapper">
    <div class="grid">
      <ProductCard
        v-for="p in sortedProducts"
        :key="p.id"
        :product="p"
        @added="onAdded"
        @qty-changed="onQtyChanged"
        @removed="onRemoved"
        @open-detail="openDetail"
      />
    </div>
    <AddToCartPopup
      :product="popupProduct"
      :visible="showAddPopup"
      @close="showAddPopup = false"
      @view-cart="goCart"
    />
    <InfoToast
      :message="toastMessage"
      :visible="showToast"
      :type="toastType"
      @close="showToast = false"
    />
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'
import AddToCartPopup from './AddToCartPopup.vue'
import InfoToast from './InfoToast.vue'

export default {
  name: 'ProductGrid',
  components: { ProductCard, AddToCartPopup, InfoToast },
  props: {
    products: { type: Array, required: true },
    sortOrder: { type: String, default: 'default' }
  },

  data() {
    return {
      showAddPopup: false,
      popupProduct: null,
      showToast: false,
      toastMessage: '',
      toastType: 'info'
    }
  },
  methods: {
    onAdded({ product }) {
      this.popupProduct = product
      this.showAddPopup = true
    },
    onQtyChanged() {
      this.toastType = 'info'
      this.toastMessage = 'Quantity produk berhasil diubah'
      this.triggerToast()
    },
    onRemoved() {
      this.toastType = 'danger'
      this.toastMessage = 'Produk dihapus dari keranjang'
      this.triggerToast()
    },
    triggerToast() {
      this.showToast = false
      this.$nextTick(() => { this.showToast = true })
    },
    goCart() {
      this.$router.push('/cart')
      this.showAddPopup = false
    },
    openDetail(product){
      console.log('open detail', product)
    }
  },

  computed: {
  sortedProducts() {
    if (this.sortOrder === 'default') return this.products
    return [...this.products].sort((a, b) => {
      if (this.sortOrder === 'desc') return b.price - a.price
      if (this.sortOrder === 'asc') return a.price - b.price
      return 0
    })
  }
}
}
</script>

<style scoped>
.grid-wrapper{
  position:relative;
}

.grid{
  display:grid;
  gap:20px;
  grid-template-columns:repeat(auto-fill, minmax(180px,1fr));
}

</style>