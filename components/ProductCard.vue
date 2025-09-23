<template>
  <div class="product-card">
    <div class="thumb" @click="$emit('open-detail', product)">
      <img :src="product.thumbnail" :alt="product.title" />
      <span v-if="product.discountPercentage" class="badge">
        -{{ Math.round(product.discountPercentage) }}%
      </span>
    </div>
    <div class="body">
      <h6 class="title" :title="product.title">{{ product.title }}</h6>
      <div class="price">
        <div v-if="product.discountPercentage" class="strike">
          Rp {{ formatPrice(product.price) }}
        </div>
        <div class="final">Rp {{ formatPrice(finalPrice) }}</div>
      </div>
      <button v-if="qty === 0" class="btn-buy" @click="addToCart">Beli</button>
      <div v-else class="qty-control">
        <button class="qc-btn" @click="decQty">−</button>
        <div class="qc-val">{{ qty }}</div>
        <button class="qc-btn" @click="incQty">+</button>
      </div>
        <div class="instant-badge">
          <img src="instant.svg" alt="instant" class="instant-icon" />
          <span class="instant-text">Pengiriman Instant</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  props: { product: { type: Object, required: true } },
  emits: ['added', 'qty-changed', 'removed', 'open-detail'],
  setup(props) {
    const finalPrice = computed(() => {
      const p = Number(props.product.price) || 0
      const d = Number(props.product.discountPercentage) || 0
      return Math.round(p * (1 - d / 100))
    })
    
    // Ganti formatRupiah dengan formatPrice
    function formatPrice(price) {
      return new Intl.NumberFormat('id-ID').format(price * 16500)
    }
    
    return { finalPrice, formatPrice }
  },
  computed: {
    ...mapGetters('cart', ['getQty']),
    qty() {
      return this.getQty(this.product.id)
    }
  },
  methods: {
    ...mapActions('cart', ['add', 'inc', 'dec']),
    addToCart() {
      this.add(this.product)
      this.$emit('added', { product: this.product, qty: 1 })
    },
    incQty() {
      this.inc(this.product.id)
      this.$emit('qty-changed', { product: this.product, qty: this.qty + 1 })
    },
    decQty() {
      if (this.qty === 1) {
        this.dec(this.product.id)
        this.$emit('removed', { product: this.product })
      } else {
        this.dec(this.product.id)
        this.$emit('qty-changed', { product: this.product, qty: this.qty - 1 })
      }
    }
  }
}
</script>

<style scoped>
.product-card{
  display:flex;
  flex-direction:column;
  height:100%;
  border:1px solid #f0f0f0;
  border-radius:12px;
  background:#fff;
  box-shadow:0 2px 8px rgba(0,0,0,.04);
  transition:transform .15s ease, box-shadow .15s ease;
}

.product-card:hover{
  transform:translateY(-2px);
  box-shadow:0 6px 20px rgba(0,0,0,.08);
}

.thumb{
  position:relative;
  background:#fff;
  aspect-ratio:1/1;
  display:grid;
  place-items:center;
  padding:18px;
  border-bottom:1px solid #f3f3f3;
  cursor:pointer;
}

.thumb img{
  max-width:100%;
  max-height:100%;
  object-fit:contain;
}

.badge{
  position:absolute;
  top:10px;
  right:10px;
  background:#ff5a5f;
  color:#fff;
  font-size:12px;
  padding:2px 6px;
  border-radius:6px;
}

.body{
  flex:1;
  display:flex;
  flex-direction:column;
  gap:10px;
  padding:14px 16px 16px;
}

.title{
  font-size:14px;
  font-weight:600;
  margin:0;
  line-height:1.3;
  display:-webkit-box;
  line-clamp:2;
  -webkit-box-orient:vertical;
  overflow:hidden;
  min-height:2.6em;
}

.price{
  display:flex;
  flex-direction: column;
  gap: 2px;
  margin-top:4px;
}

.final{
  color:#d3161c;
  font-size:16px;
  font-weight:700;
  order: 2;
}

.strike{
  color:#9aa0a6;
  text-decoration:line-through;
  font-size:12px;
  order: 1;
}

.btn-buy{
  margin-top:auto;
  height:44px;
  width:100%;
  border-radius:10px;
  border:0;
  background:#d3161c;
  color:#fff;
  font-weight:700;
  cursor:pointer;
  font-size:14px;
}

.btn-buy:hover{ 
  background:#b81318; 
}

.qty-control{
  margin-top:auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  background:#fafafa;
  border:1px solid #e6e6e6;
  border-radius:10px;
  height:44px;
  padding:0 6px;
  gap:4px;
}

.qc-btn{
  width:38px;
  height:32px;
  border:1px solid #d0d0d0;
  background:#fff;
  border-radius:8px;
  font-size:18px;
  font-weight:600;
  cursor:pointer;
  line-height:1;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:background .15s;
}

.qc-btn:hover{ background:#f2f2f2; }
.qc-val{
  flex:1;
  text-align:center;
  font-weight:600;
  font-size:14px;
  user-select:none;
}

.instant-badge{
  display:flex;
  align-items:center;
  gap:6px;
  margin-top:2px;
}

.instant-icon{
  width:16px;
  height:16px;
  flex-shrink:0;
}

.instant-text{
  font-size:12px;
  color:#666;
  font-weight:500;
}

</style>