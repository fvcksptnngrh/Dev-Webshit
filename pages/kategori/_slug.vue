<template>
  <div>
    <div class="main-container">
    <nav class="breadcrumb">
      <a href="/" class="breadcrumb-link">Home</a>
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-current">{{ kategoriFormatted }}</span>
    </nav>
    <div class="product-grid">
    <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
        @show-toast="handleShowToast"
        @open-detail="openDetail"
    />
    <AddToCartPopup
        :product="popupProduct"
        :visible="showAddPopup"
        placement="top-mid"
        :yPercent="16"
        @close="showAddPopup=false"
        @view-cart="goCart"
      />
    <InfoToast
        :message="toastMessage"
        :visible="showToast"
        placement="top-mid"
        :yPercent="15"
        @close="showToast=false"
      />
      <ProductDescriptionPopup
        :visible="showDescPopup"
        :product="selectedProduct"
        @close="closeDesc"
        @add-to-cart="onAdded"
      />
      </div>
    </div>
    <SeoContent/>
  </div>
</template>



<script>
import ProductCard from '~/components/ProductCard.vue'
import AddToCartPopup from '~/components/AddToCartPopup.vue'
import InfoToast from '~/components/InfoToast.vue'
import ProductDescriptionPopup from '~/components/ProductDescriptionPopup.vue'
import SeoContent from '~/components/SeoContent.vue'

export default {
  components: { 
    ProductCard, 
    AddToCartPopup, 
    InfoToast, 
    ProductDescriptionPopup,
    SeoContent
  },

  data() {
    return {
      kategori: '',
      products: [],
      showAddPopup: false,
      showToast: false,
      toastMessage: '',
      showDescPopup: false,
      selectedProduct: null,
      popupProduct: null
    }
  },
  async asyncData({ params }) {
    const kategori = params.slug
    const res = await fetch(`https://dummyjson.com/products/category/${kategori}`)
    const data = await res.json()
    return {
      kategori,
      products: data.products || []
    }
  },
  methods: {
    goCart() {
      this.$router.push('/cart')
      this.showAddPopup = false
    },
    openDetail(product) {
      this.selectedProduct = { ...product }
      this.showDescPopup = true
    },
    closeDesc() {
      this.showDescPopup = false
      this.selectedProduct = null
    },
    onAdded({ product }) {
      this.popupProduct = product
      this.showAddPopup = true
    },
    onQtyChanged() {
      this.toastMessage = 'Quantity produk berhasil diubah'
      this.triggerToast()
    },
    onRemoved() {
      this.toastMessage = 'Produk dihapus dari keranjang'
      this.triggerToast()
    },
    triggerToast() {
      this.showToast = false
      this.$nextTick(() => { this.showToast = true })
    },

    handleAddToCart(product) {
        this.popupProduct = product
    this.showAddPopup = true
    this.toastMessage = 'Produk berhasil ditambahkan ke keranjang'
    this.showToast = false
    this.$nextTick(() => { this.showToast = true })
    },
    handleShowToast(message) {
        this.toastMessage = message
        this.showToast = false
        this.$nextTick(() => { this.showToast = true })
    }
  },
    computed: {
    kategoriFormatted() {
        if (!this.kategori) return ''
        return this.kategori.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        }
    }
}
</script>

<style scoped>

.main-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  justify-content: center;
  align-items: start;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  margin-bottom: 40px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 24px;
  padding: 12px 24px;
  box-shadow: 0 2px 8px #0001;
  width: 85%;
  box-sizing: border-box;
}
.breadcrumb-link {
  color: #2d7ef7;
  text-decoration: none;
  font-weight: 400;
  margin-right: 8px;
}
.breadcrumb-separator {
  color: #e57373;
  font-size: 1.2em;
  margin: 0 8px;
}
.breadcrumb-current {
  color: #888;
  font-weight: 400;
  font-size: 1rem;
}
.kategori-title {
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: #222;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);   /* Selalu 6 kolom */
  gap: 16px;
  justify-content: center;                 /* Tengah horizontal */
  align-items: start;
  margin: 0 auto;
  max-width: 1100px;                       /* Sesuaikan agar grid tidak terlalu lebar */
  width: 100%;
}
</style>