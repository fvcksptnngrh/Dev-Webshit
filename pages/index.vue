<template>
  <div>
    <div class="mt-4 mt-lg-5"><BannerSlider /></div>
    <div class="mt-4 mb-5 mt-lg-5"><CategorySlider /></div>
    <div class="mt-4 mb-5 mt-lg-5"><GifSection src="gif-alfa.gif" alt="Banner GIF" /></div>

    <div class="mt-4 mb-5 mt-lg-5">
      <ProductSection
        title="Produk Terbaru"
        :limit="18"
        :skip="0"
        :initial="6"
        @added="onAdded"
        @qty-changed="onQtyChanged"
        @removed="onRemoved"
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
    <div class="mt-5 mb-5">
      <ProductSection
        title="Produk Rekomendasi"
        :limit="18"
        :skip="18"
        :initial="6"
        @added="onAdded"
        @qty-changed="onQtyChanged"
        @removed="onRemoved"
        @open-detail="openDetail"
      />
    </div>
    <Achievements class="mt-5" src="/achievements.png" alt="Keuntungan Alfagift" />
    <SeoContent />
  </div>
</template>

<script>
import BannerSlider from '~/components/BannerSlider.vue'
import CategorySlider from '~/components/CategorySlider.vue'
import GifSection from '~/components/GifSection.vue'
import ProductSection from '~/components/ProductSection.vue'
import Achievements from '~/components/Achievements.vue'
import SeoContent from '~/components/SeoContent.vue'
import AddToCartPopup from '~/components/AddToCartPopup.vue'
import InfoToast from '~/components/InfoToast.vue'
import ProductDescriptionPopup from '~/components/ProductDescriptionPopup.vue'

export default {
  components: {
    BannerSlider,
    CategorySlider,
    GifSection,
    ProductSection,
    Achievements,
    SeoContent,
    AddToCartPopup,
    InfoToast,
    ProductDescriptionPopup
  },
  data() {
    return {
      showAddPopup: false,
      popupProduct: null,
      showToast: false,
      toastMessage: '',
      showDescPopup: false,
      selectedProduct: null
    }
  },
  methods: {
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
    goCart() {
      this.$root.$emit('ui:openMiniCart')
      this.showAddPopup = false
    },
    openDetail(product) {
      console.log('Opening detail for product:', product)
      this.selectedProduct = { ...product }
      this.showDescPopup = true
    },
    closeDesc() {
      this.showDescPopup = false
      this.selectedProduct = null
    }
  }
}
</script>