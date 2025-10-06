<template>
  <div class="mini-cart" ref="panel" @keydown.esc="$emit('close')">
    <div class="mc-head">
      <span>Keranjang ({{ totalItems }})</span>
      <button class="mc-close" @click="$emit('close')">×</button>
    </div>
    <div v-if="!itemsList.length" class="mc-empty">
      Keranjang masih kosong
    </div>
    <ul v-else class="mc-list">
      <li v-for="it in itemsList" :key="it.product.id" class="mc-item">
        <img :src="it.product.thumbnail" :alt="it.product.title" />
        <div class="mc-meta">
          <p class="mc-title" :title="it.product.title">{{ it.product.title }}</p>
          <div class="mc-line">
            <strong>{{ formatPrice(getFinalPrice(it.product) * it.qty) }}</strong>
          </div>
          <div class="mc-qty">
            <button @click="decQty(it.product.id)">−</button>
            <span>{{ it.qty }}</span>
            <button @click="incQty(it.product.id)">+</button>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="itemsList.length" class="mc-footer">
      <div class="mc-total">
        <span>Total</span>
        <strong>Rp {{ formatPrice(calculateTotal()) }}</strong>
      </div>
      <button class="mc-checkout" @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MiniCart',
  emits: ['close'],
  computed: {
    ...mapGetters('cart', ['itemsList', 'totalItems', 'totalPrice']),
    currentUser() {
         return this.$store.getters.totalItems;
    }
  },
  methods: {
    ...mapActions('cart', ['inc', 'dec']),
    incQty(id){ this.inc(id) },
    decQty(id){ this.dec(id) },
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID').format(price * 16500)
    },
    getFinalPrice(product) {
      const p = Number(product.price) || 0
      const d = Number(product.discountPercentage) || 0
      return Math.round(p * (1 - d / 100))
    },
      calculateTotal() {
      return this.itemsList.reduce((total, item) => {
        return total + (this.getFinalPrice(item.product) * item.qty)
      }, 0)
    },
    checkout(){
      this.$emit('close')
    },
    handleOutside(e){
      if(!this.$refs.panel) return
      if(!this.$refs.panel.contains(e.target)) this.$emit('close')
    }
  },
  mounted(){
    document.addEventListener('mousedown', this.handleOutside)
  },
  beforeDestroy(){
    document.removeEventListener('mousedown', this.handleOutside)
  }
}
</script>

<style scoped>
.mini-cart{
  position:absolute;
  top:100%;
  right:0;
  margin-top:10px;
  width:360px;
  max-height:520px;
  background:#fff;
  border:1px solid #e6e6e6;
  border-radius:12px;
  box-shadow:0 10px 32px -4px rgba(0,0,0,.16);
  display:flex;
  flex-direction:column;
  overflow:hidden;
  z-index:1400;
  animation:fadeIn .18s ease;
  font-size:13px;
}

@keyframes fadeIn {
  from { opacity:0; transform:translateY(-4px); }
  to { opacity:1; transform:translateY(0); }
}

.mc-head{
  display:flex; 
  justify-content:space-between; 
  align-items:center;
  padding:12px 14px; 
  font-weight:600; 
  border-bottom:1px solid #eee;
}

.mc-close{ 
    background:none; 
    border:0; 
    font-size:20px; 
    cursor:pointer; 
    line-height:1; 
}

.mc-empty{ 
    padding:28px 16px; 
    text-align:center; 
    color:#666; 
}

.mc-list{
  list-style:none; 
  margin:0; 
  padding:0;
  overflow:auto; 
  flex:1;
}

.mc-item{
  display:flex; 
  gap:12px; 
  padding:12px 14px; 
  border-bottom:1px solid #f3f3f3;
}

.mc-item:last-child{ 
  border-bottom:0; 
}

.mc-item img{
  width:64px; 
  height:64px; 
  object-fit:contain; 
  border:1px solid #f0f0f0; 
  border-radius:8px; 
  background:#fff;
}

.mc-meta{ 
  flex:1; 
  display:flex; 
  flex-direction:column; 
}

.mc-title{
  margin:0 0 4px; 
  line-height:1.3; 
  font-weight:600;
  display:-webkit-box; 
  line-clamp:2; 
  -webkit-box-orient:vertical; 
  overflow:hidden;
}

.mc-line{ 
  font-size:12px; 
  margin-bottom:6px; 
}

.mc-qty{
  display:inline-flex; 
  align-items:center; 
  gap:6px;
}

.mc-qty button{
  width:28px; 
  height:28px; 
  border:1px solid #ccc; 
  background:#fff; 
  border-radius:6px;
  font-weight:600; 
  cursor:pointer; 
  line-height:1;
}

.mc-qty span{ 
  min-width:20px; 
  text-align:center; 
  font-weight:600; 
}

.mc-footer{
  border-top:1px solid #eee;
  padding:12px 14px 14px;
  display:flex;
  flex-direction:column;
  gap:10px;
  background:#fafafa;
}
.mc-total{ 
  display:flex; 
  justify-content:space-between; 
  font-size:14px; 
}

.mc-checkout{
  background:#d3161c; 
  border:0; 
  color:#fff; 
  font-weight:700;
  height:42px; 
  border-radius:10px; 
  cursor:pointer;
}

.mc-checkout:hover{ 
  background:#b81318; 
}

</style>