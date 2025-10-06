<template>
  <div>
    <div class="main-container">
    <nav class="breadcrumb">
      <span class="breadcrumb-separator">›</span>
            <nuxt-link to="/">Home</nuxt-link>
      <!-- <a href="/" class="breadcrumb-link">Home</a>asdsad -->
      <span class="breadcrumb-separator">›</span>
      <span class="breadcrumb-current">{{ kategoriFormatted }}</span>
    </nav>
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
    <div class="product-grid">
    <ProductCard
        v-for="product in sortedProducts"
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
import { BIcon,BIconArrowDown, BIconArrowUp, BIconArrowDownUp, BIconList } from 'bootstrap-vue'

export default {
  components: { 
    ProductCard, 
    AddToCartPopup, 
    InfoToast, 
    ProductDescriptionPopup,
    SeoContent,
    'b-icon': BIcon,
    'b-icon-arrow-down-up': BIconArrowDownUp,
    'b-icon-arrow-down': BIconArrowDown,
    'b-icon-arrow-up': BIconArrowUp,
    'b-icon-list': BIconList
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
      popupProduct: null,
      sortOrder: 'default',
      showSortDropdown: false,
      searchKeyword: ''
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
    },
    setSort(order) {
      this.sortOrder = order
      this.showSortDropdown = false
    },
    doSearch() {
      }

  },
computed: {
  kategoriFormatted() {
    if (!this.kategori) return ''
    return this.kategori.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  },
      sortLabel() {
    if (this.sortOrder === 'asc') return 'Harga Terendah'
    if (this.sortOrder === 'desc') return 'Harga Tertinggi'
    return 'Default'
  },
  sortedProducts() {
    if (this.sortOrder === 'default') {
      return this.products
    }
    return [...this.products].sort((a, b) => {
      if (this.sortOrder === 'desc') {
        return b.price - a.price
      } else if (this.sortOrder === 'asc') {
        return a.price - b.price
      }
      return 0
    })
  },
}
}
</script>

<style scoped>

.main-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
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
  color : #a8a8a8;
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
  color: #ff0000;
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
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  justify-content: center;
  align-items: start;
  margin: 0 auto;
  max-width: 1100px;
  width: 100%;
}

.sort-dropdown-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.sort-btn {
  background: #fff;
  border: 1.5px solid #fd0000;
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
  box-shadow: 0 2px 12px rgba(179, 179, 179, 0.08);
  min-width: 180px;
  z-index: 10;
  padding: 8px 0;
}

.sort-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 1rem;
  color: #fd0000;
  transition: background 0.15s;
}

.sort-item:hover {
  background: #f5f7fa;
}

.sort-icon {
  font-size: 1.2em;
}

.sort-btn:hover, .sort-btn:focus {
  border-color: #b71c1c;
  color: #b71c1c;
}
</style>