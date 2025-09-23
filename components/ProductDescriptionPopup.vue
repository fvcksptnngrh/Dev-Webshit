<template>
  <transition name="fade">
    <div v-if="visible" class="popup-overlay" @click.self="$emit('close')">
      <div class="popup-content">
        <button class="close-btn" @click="$emit('close')" aria-label="Tutup">
          <span>&times;</span>
        </button>
        <div class="scrollable-content">
          <div class="upper-section">
            <div class="product-image">
              <img :src="product?.image || product?.thumbnail" :alt="product?.name">
            </div>
            <div class="price-info">
              <div class="original-price" v-if="product?.discountPercentage">
                Rp {{ formatPrice(product?.price ) }}
              </div>
              <div class="current-price">
                Rp {{ formatPrice(finalPrice) }}
              </div>
            </div>
            <div class="delivery-badge">
              <img src="/Instant.svg" alt="Check" class="check-icon">
              <span>Pengiriman Instan</span>
            </div>
            <h3 class="product-title">{{ product?.name || product?.title }}</h3>
            <div class="shipping-info">
              <img src="/Delivery.svg" alt="Shipping" class="shipping-icon">
              <span>Area Pengiriman: <strong>Bekasi</strong></span>
            </div>
            <div class="gratis-info">
              <img src="/Price.svg" alt="Shipping" class="shipping-icon">
              <span>Biaya Pengiriman <strong>Gratis</strong></span>
            </div>
          </div>
          <div class="description-section">
            <h4 class="desc-title">Deskripsi</h4>
            <p class="desc-text">{{ product?.description || 'Tidak ada deskripsi tersedia.' }}</p>
          </div>
        </div>
        <div class="footer-button">
          <button 
            class="cart-btn" 
            @click="handleAddToCart"
            :disabled="isAddingToCart"
          >
            <div v-if="isInCart" class="quantity-control">
              <button class="qty-btn" @click.stop="handleDecrement">-</button>
              <span class="qty-text">{{ cartQty }}</span>
              <button class="qty-btn" @click.stop="handleIncrement">+</button>
          </div>
          <span v-else @click="handleAddToCart">
            {{ isAddingToCart ? 'Menambahkan...' : '+ Keranjang' }}
          </span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductDescriptionPopup',
  props: {
    visible: Boolean,
    product: Object
  },
  data() {
    return {
      isAddingToCart: false
    }
  },
  computed: {
    ...mapState({
      cartItems: state => state.cart.items
    }),
    ...mapGetters({
      getQty: 'cart/getQty'
    }),
    isInCart() {
      return this.product && this.cartItems[this.product.id]
    },
    cartQty() {
      return this.product ? this.getQty(this.product.id) : 0
    },
    finalPrice() {
      if (!this.product?.price) return 0
      const p = Number(this.product.price) || 0
      const d = Number(this.product.discountPercentage) || 0
      return Math.round(p * (1 - d / 100))
    }

  },
  methods: {
    ...mapActions({
      addToCart: 'cart/add',
      incrementQty: 'cart/inc',
      decrementQty: 'cart/dec'
    }),
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID').format(price * 16500)
    },
    async handleAddToCart() {
      if (!this.product) return
      try {
        this.isAddingToCart = true
        await this.addToCart(this.product)
      } catch (error) {
        console.error('Error adding to cart:', error)
        this.$bvToast?.toast('Gagal menambahkan produk ke keranjang', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      } finally {
        this.isAddingToCart = false
      }
    },
    handleIncrement() {
      if (this.product) {
        this.incrementQty(this.product.id)
      }
    },
    handleDecrement() {
      if (this.product) {
        this.decrementQty(this.product.id)
      }
    }
  }
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 20px;
}

.popup-content {
  position: relative;
  background: white;
  width: 100%;
  max-width: 380px;
  height: auto;
  max-height: 85vh;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}


.scrollable-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 80px;
}

.upper-section {
  margin-bottom: 20px;
}

.product-image {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.price-info {
  margin-bottom: 12px;
}

.current-price {
  font-size: 19px;
  font-weight: 600;
  color: #d3161c;
}

.original-price {
  font-size: 11px;
  color: #999;
  text-decoration: line-through;
}

.product-title {
  font-size: 19px;
  color: #222;
  margin: 0 0 12px;
  line-height: 1.4;
  font-weight: 550;
}

.description-section {
  border-top: 1px solid #eee;
  padding-top: 16px;
}

.desc-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px;
}

.desc-text {
  font-size: 13px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.close-btn {
  position: absolute;
  right: 16px;
  top: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.delivery-badge {
  position: absolute;
  right: 16px;
  top: 60px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fff8e5;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: #b4690e;
  z-index: 2;
}

.check-icon {
  width: 16px;
  height: 16px;
}

.shipping-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
}

.shipping-icon {
  width: 18px;
  height: 18px;
}

.gratis-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
}

.gratis-icon{
  width: 18px;
  height: 18px;
}

.footer-button {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  border-top: 1px solid #eee;
  border-radius: 0 0 12px 12px;
}

.cart-btn {
  width: 100%;
  background: #d3161c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 48px;
}

.quantity-control {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; 
}

.qty-btn {
  background: transparent;
  border: none;
  color: white;
  width: 33%;
  height: 28px;
  border-radius: 6px;
  font-size: 16px;
  line-height: bold;
  cursor: pointer;
  padding: 0;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover {
  background: rgba(255,255,255,0.3);
}

.qty-text {
  width: 33%;
  text-align: center;
  font-weight: 600;
}

.cart-btn:disabled {
  background: #e99;
  cursor: not-allowed;
}

.cart-btn:hover {
  background: #b81419;
}

.qty-text {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.2s ease;
}

.qty-btn {
  transition: transform 0.1s ease;
}

.qty-btn:active {
  transform: scale(0.95);
}

.minus, plus {
  order: unset;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.qty-btn, .qty-text {
  transition: all 0.2s ease;
}

.cart-btn:disabled {
  background: #e99;
  cursor: not-allowed;
  opacity: 0.8;
}

.footer-button {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  border-top: 1px solid #eee;
  border-radius: 0 0 12px 12px;
}

@media (max-width: 480px) {
  .popup-overlay {
    padding: 16px;
  }
  
  .popup-content {
    max-width: 340px;
  }

  .product-image {
    height: 240px;
  }
}

</style>