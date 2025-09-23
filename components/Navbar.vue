<template>
  <div class="nav-shell" :style="navInlineStyle">
    <b-navbar type="light" variant="light" class="navbar-main shadow-sm">
      <b-container class="navbar-main__container">
        <b-navbar-brand href="#" class="navbar-main__brand">
          <img src="/logo-alfagift.png" alt="Alfagift Logo" class="navbar-main__logo" />
        </b-navbar-brand>

        <div class="cat-trigger-wrapper"
             @mouseenter="openCat"
             @mouseleave="scheduleClose">
          <div class="cat-trigger"
               role="button"
               tabindex="0"
               :aria-expanded="showCatPanel ? 'true':'false'"
               aria-controls="cat-panel"
               @click.prevent="toggleCatClick"
               @keydown.enter.prevent="toggleCatClick"
               @keydown.space.prevent="toggleCatClick">
            <b-icon icon="grid" class="icon" />
            <span>Kategori</span>
            <b-icon icon="chevron-down" class="chevron" :class="{ open: showCatPanel }" />
          </div>
        </div>

        <b-form inline class="navbar-main__search">
          <b-input-group class="navbar-main__search-group">
            <b-form-input placeholder="Temukan produk favoritmu disini"
                          class="navbar-main__search-input"
                          @focus="$emit('search-focus', true)"
                          @blur="$emit('search-focus', false)" />
            <b-input-group-append>
              <b-button variant="danger" class="navbar-main__search-button">
                <b-icon icon="search" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form>

        <b-nav class="navbar-main__right ml-auto">
          <b-nav-item href="#" class="navbar-main__link ">Brand</b-nav-item>
            <b-nav-item href="#" class="navbar-main__link ">Promo</b-nav-item>
          <div class="cart-wrapper">
            <CartBadge @open-cart="toggleMiniCart" />
            <MiniCart v-if="showMiniCart" @close="showMiniCart=false" />
          </div>
          <b-nav-item href="#" class="navbar-main__user">
            <b-icon icon="person" class="navbar-main__user-icon" />
            <span class="navbar-main__user-name">Adhi</span>
          </b-nav-item>
        </b-nav>
      </b-container>
    </b-navbar>

    <transition name="cat-slide"
                @enter="onEnter" @after-enter="afterEnter"
                @leave="onLeave" @after-leave="afterLeave">
      <div v-if="showCatPanel"
           id="cat-panel"
           class="cat-panel"
           @mouseenter="cancelClose"
           @mouseleave="scheduleClose">
        <div class="cat-panel__inner">
          <div class="cat-cols">
            <ul class="cat-list">
              <li v-for="(c,i) in categories"
                  :key="i"
                  class="cat-item"
                  :class="{ active: i === hoverIndex }"
                  @mouseenter="hoverIndex=i"
                  tabindex="0">
                <span class="cat-icon">{{ c.icon }}</span>
                <span class="cat-name">{{ c.name }}</span>
                <b-icon icon="chevron-right" class="chevron-right" />
              </li>
            </ul>
            <div class="subcol" v-if="hoverCategory">
              <h5 class="subcol-title">{{ hoverCategory.name }}</h5>
              <p class="subcol-placeholder">Sub kategori akan ditaruh di sini.</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CartBadge from './CartBadge.vue'
import MiniCart from './MiniCart.vue'

export default {
  name: 'Navbar',
  components: { CartBadge, MiniCart },
  data() {
    return {
      showMiniCart: false,
      showCatPanel: false,
      closeTimer: null,
      hoverIndex: 0,
      topOffset: 0,
      categories: [
        { name:'Kebutuhan Dapur', icon:'🍳' },
        { name:'Kebutuhan Ibu & Anak', icon:'🍼' },
        { name:'Kebutuhan Rumah', icon:'🏠' },
        { name:'Makanan', icon:'🍜' },
        { name:'Minuman', icon:'🥤' },
        { name:'Produk Segar & Beku', icon:'❄️' },
        { name:'Personal Care', icon:'🧴' },
        { name:'Kebutuhan Kesehatan', icon:'💊' },
        { name:'Lifestyle', icon:'🎧' },
        { name:'Pet Foods', icon:'🐾' }
      ]
    }
  },
  computed: {
    hoverCategory() { return this.categories[this.hoverIndex] || null },
    navInlineStyle() {
      return { '--nav-offset': this.topOffset + 'px' }
    }
  },
  mounted() {
    this.computeOffset()
    window.addEventListener('resize', this.computeOffset)
    this.$root.$on('ui:openMiniCart', () => {
      this.showMiniCart = true
      this.hideCatImmediate()
    })
    document.addEventListener('mousedown', this.handleOutside)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.computeOffset)
    document.removeEventListener('mousedown', this.handleOutside)
    this.clearTimer()
  },
  methods: {
    computeOffset() {
      // cari elemen TopNavbar jika ada
      const topBar = document.querySelector('.top-navbar') || document.querySelector('.TopNavbar')
      this.topOffset = topBar ? topBar.offsetHeight : 0
    },
    toggleMiniCart() {
      this.showMiniCart = !this.showMiniCart
      if (this.showMiniCart) this.hideCatImmediate()
    },
    openCat() {
      this.clearTimer()
      if (!this.showCatPanel) this.showCatPanel = true
      this.showMiniCart = false
    },
    scheduleClose() {
      this.clearTimer()
      this.closeTimer = setTimeout(() => { this.showCatPanel = false }, 180)
    },
    cancelClose() { this.clearTimer() },
    hideCatImmediate() {
      this.clearTimer()
      this.showCatPanel = false
    },
    toggleCatClick() {
      this.showCatPanel ? this.hideCatImmediate() : this.openCat()
    },
    clearTimer() {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },
    handleOutside(e) {
      if (!this.$el) return
      const panel = this.$el.querySelector('#cat-panel')
      const trigger = this.$el.querySelector('.cat-trigger')
      if (this.showCatPanel && panel && !panel.contains(e.target) && trigger && !trigger.contains(e.target)) {
        this.hideCatImmediate()
      }
      if (this.showMiniCart) {
        const cartWrap = this.$el.querySelector('.cart-wrapper')
        if (cartWrap && !cartWrap.contains(e.target)) this.showMiniCart = false
      }
    },
    onEnter(el) { el.style.height = '0px'; const h = el.scrollHeight; requestAnimationFrame(()=>{ el.style.height = h+'px' }) },
    afterEnter(el) { el.style.height = 'auto' },
    onLeave(el) { el.style.height = el.scrollHeight+'px'; requestAnimationFrame(()=>{ el.style.height='0px' }) },
    afterLeave(el) { el.style.height='0px' }
  }
}
</script>

<style scoped>
.nav-shell {
  position: sticky;
  top: 36px;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #fff;
}

.navbar-main {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.navbar-main__container {
  max-width:1240px;
  margin:0 auto;
  display:flex;
  align-items:center;
  gap:12px;
  padding:8px 8px;
}

.navbar-main__brand { 
  margin-right:12px; 
}

.navbar-main__logo {
   height:40px; 
   width:auto; 
   display:block; 
}

.cat-trigger-wrapper { 
  position:relative; 
}

.cat-trigger {
  padding:8px 18px;
  border-radius:8px;
  border:1px solid #e6e6e6;
  background:#fff;
  cursor:pointer;
  display:inline-flex;
  align-items:center;
  gap:8px;
  font-size:14px;
  font-weight:500;
  color:#444;
  transition:background .15s,border-color .15s;
  user-select:none;
}

.cat-trigger:hover { 
  background:#f8f8f8; 
}

.cat-trigger:focus { 
  outline:2px solid #d3161c33; 
  outline-offset:2px; 
}

.chevron { 
  font-size:14px; 
  transition:transform .25s; 
}

.chevron.open { 
  transform:rotate(180deg); 
}

.icon { 
  font-size:16px; 
}

.cat-panel {
  position:absolute;
  top:100%;
  left:0;
  right:0;
  background:#fff;
  border-bottom:1px solid #eee;
  box-shadow:0 10px 34px -10px rgba(0,0,0,.18);
  z-index:950;
}
.cat-panel__inner {
  max-width:1240px;
  margin:0 auto;
  padding:28px 32px 40px;
}
.cat-cols { display:flex; min-height:420px; }

.cat-list {
  list-style:none;
  margin:0; padding:0;
  width:360px;
  border-right:1px solid #f0f0f0;
  background:#fff;
}
.cat-item {
  display:flex; align-items:center;
  gap:16px;
  padding:16px 28px 16px 34px;
  font-size:15px;
  cursor:pointer;
  color:#30343a;
  transition:background .15s,color .15s;
}
.cat-item:not(:last-child){ 
  border-bottom:1px solid #f6f6f6; 
}

.cat-item:hover,.cat-item.active { 
  background:#fafafa; 
  color:#d3161c; 
}

.cat-icon { 
  width:26px; 
  text-align:center; 
  font-size:18px; 
  opacity:.9; 
}

.cat-name { 
  flex:1; 
  font-weight:500; 
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow:ellipsis; 
}

.chevron-right { 
  font-size:16px; 
  color:#b5b5b5; 
  transition:color .15s, 
  transform .15s; 
}

.cat-item:hover .chevron-right,
.cat-item.active .chevron-right { color:#d3161c; transform:translateX(2px); }

.subcol { flex:1; padding:38px 48px; }
.subcol-title { margin:0 0 14px; font-size:18px; font-weight:600; }
.subcol-placeholder { margin:0; font-size:14px; color:#666; }

.navbar-main__search { 
  flex:1 1 auto; 
  margin:0 16px; 
}

.navbar-main__search-group { width:100%; }
.navbar-main__search-input {
  height:40px;
  border-radius:10px 0 0 10px;
  font-size:14px;
  background: #f0f0f0;
}

.navbar-main__search-button {
  height:40px;
  border-radius:0 10px 10px 0;
  padding:0 18px;
  background:#d3161c;
  border-color:#d3161c;
}

.navbar-main__right {
  display:inline-flex;
  align-items:center;
  gap:18px;
  position:relative;
  z-index:2;
}

.navbar-main__link,
.navbar-main__user {
  color: #777 !important;
}

.navbar-main__link a,
.navbar-main__user a,
.navbar-main__link:active,
.navbar-main__link:focus,
.navbar-main__link:hover,
.navbar-main__user:active,
.navbar-main__user:focus,
.navbar-main__user:hover {
  color: #777 !important;
  font-weight: 600 !important;
  text-decoration: none !important;
}

.cart-wrapper { position:relative; display:inline-flex; align-items:center; cursor:pointer; }

.cat-slide-enter-active,
.cat-slide-leave-active {
  transition:height .30s cubic-bezier(.4,0,.2,1), opacity .25s;
}
.cat-slide-enter-from,
.cat-slide-leave-to { opacity:0; }

@media (max-width:992px){
  .navbar-main__right .navbar-main__link { display:none; }
  .cat-panel__inner { padding:20px 16px 28px; }
  .cat-cols { flex-direction:column; min-height:0; }
  .cat-list { width:100%; border-right:0; }
  .subcol { padding:30px 24px; }
}
</style>
