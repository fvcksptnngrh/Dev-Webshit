<template>
  <div class="cart-badge" @click.stop="$emit('open-cart')" title="Keranjang">
    <b-icon icon="cart"></b-icon>
    <span v-if="totalItems" class="cb-count">{{ totalItems }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CartBadge',
  emits: ['open-cart'],
  computed: {
    ...mapGetters('cart', ['itemsList', 'totalItems', 'totalPrice'])
  }
}
</script>

<style scoped>
.cart-badge{
  position:relative;
  width:38px; height:38px;
  display:inline-flex; align-items:center; justify-content:center;
  cursor:pointer;
}

.cb-count{
  position:absolute; top:4px; right:6px;
  background:#d3161c; color:#fff;
  font-size:11px; min-width:18px; height:18px;
  border-radius:10px; display:flex; align-items:center; justify-content:center;
  padding:0 5px; line-height:1;
  font-weight:600;
}

</style>