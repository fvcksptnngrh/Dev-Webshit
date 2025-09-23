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

        <!-- Search Form with API Integration -->
        <div class="navbar-main__search-wrapper">
          <b-form inline class="navbar-main__search" @submit.prevent="handleSearch">
            <b-input-group class="navbar-main__search-group">
              <b-form-input 
                v-model="searchQuery"
                placeholder="Temukan produk favoritmu disini"
                class="navbar-main__search-input"
                @focus="onSearchFocus"
                @blur="onSearchBlur"
                @input="onSearchInput"
                @keydown.down.prevent="navigateDown"
                @keydown.up.prevent="navigateUp"
                @keydown.enter.prevent="selectSuggestion"
                @keydown.escape="hideSuggestions"
                :disabled="isLoading" />
              <b-input-group-append>
                <b-button 
                  variant="danger" 
                  class="navbar-main__search-button"
                  type="submit"
                  :disabled="isLoading"
                  @click="handleSearch">
                  <b-spinner v-if="isLoading" small />
                  <b-icon v-else icon="search" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form>

          <!-- Search Suggestions Dropdown -->
          <div v-if="showSuggestions" class="search-suggestions">
            <!-- Loading State -->
            <div v-if="isLoadingSuggestions" class="loading-suggestions">
              <b-spinner small />
              <span>Mencari produk...</span>
            </div>

            <!-- API Search Results -->
<div v-else-if="searchQuery !== '' && apiSuggestions.length > 0" class="suggestions-section">
  <div class="suggestions-header">
    <span>Produk ({{ apiSuggestions.length }} hasil)</span>
  </div>
  <div v-for="(product, index) in apiSuggestions" 
       :key="'product-' + product.id"
       :class="['suggestion-item product-item', { active: selectedIndex === index }]"
       @click="selectProduct(product)"
       @mouseenter="selectedIndex = index">
    <div class="product-image">
      <img v-if="product.thumbnail" :src="product.thumbnail" :alt="product.title" />
      <div v-else class="no-image">
        <b-icon icon="image" />
      </div>
    </div>
    <div class="product-info">
      <div class="product-title" v-html="highlightMatch(product.title)"></div>
      <div class="product-brand" v-if="product.brand">{{ product.brand }}</div>
      <div class="product-category" v-if="product.category">{{ product.category }}</div>
      <div class="product-price">${{ product.price }}</div>
    </div>
  </div>
</div>

            <!-- API Search Results -->
            <div v-else-if="searchQuery !== '' && apiSuggestions.length > 0" class="suggestions-section">
              <div class="suggestions-header">
                <span>Produk ({{ apiSuggestions.length }} hasil)</span>
              </div>
              <div v-for="(product, index) in apiSuggestions" 
                   :key="'product-' + product.id"
                   :class="['suggestion-item product-item', { active: selectedIndex === index }]"
                   @click="selectProduct(product)"
                   @mouseenter="selectedIndex = index">
                <div class="product-image">
                  <img v-if="product.image" :src="product.image" :alt="product.title" />
                  <div v-else class="no-image">
                    <b-icon icon="image" />
                  </div>
                </div>
                <div class="product-info">
                  <div class="product-title" v-html="highlightMatch(product.title)"></div>
                  <div class="product-category">{{ product.category }}</div>
                  <div class="product-price">${{ product.price }}</div>
                </div>
              </div>
            </div>

            <!-- No Results -->
            <div v-else-if="searchQuery !== '' && !isLoadingSuggestions && apiSuggestions.length === 0" class="no-results">
              <b-icon icon="search" />
              <span>Tidak ada hasil untuk "{{ searchQuery }}"</span>
            </div>
          </div>
        </div>

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

    <!-- ...existing cat-panel code... -->
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
      
      // Search functionality
      searchQuery: '',
      showSuggestions: false,
      selectedIndex: -1,
      searchHistory: [],
      isSearchFocused: false,
      isLoading: false,
      isLoadingSuggestions: false,
      
      // API data - menggunakan API yang sama dengan ProductSection
      apiSuggestions: [],
      searchTimeout: null,
      allProducts: [], // Cache semua produk
      
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
    this.loadSearchHistory()
    this.loadAllProducts() // Load produk saat component mounted
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
    this.clearSearchTimeout()
  },
  methods: {
    // ...existing methods untuk kategori dan cart...
    computeOffset() {
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
      this.hideSuggestions()
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
    clearSearchTimeout() {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = null
      }
    },
    handleOutside(e) {
      if (!this.$el) return
      
      // Handle category panel
      const panel = this.$el.querySelector('#cat-panel')
      const trigger = this.$el.querySelector('.cat-trigger')
      if (this.showCatPanel && panel && !panel.contains(e.target) && trigger && !trigger.contains(e.target)) {
        this.hideCatImmediate()
      }
      
      // Handle cart
      if (this.showMiniCart) {
        const cartWrap = this.$el.querySelector('.cart-wrapper')
        if (cartWrap && !cartWrap.contains(e.target)) this.showMiniCart = false
      }
      
      // Handle search suggestions
      const searchWrapper = this.$el.querySelector('.navbar-main__search-wrapper')
      if (this.showSuggestions && searchWrapper && !searchWrapper.contains(e.target)) {
        this.hideSuggestions()
      }
    },
    
    // Load semua produk dari API yang sama dengan ProductSection
    async loadAllProducts() {
      try {
        // Menggunakan API yang sama dengan ProductSection
        // Ambil lebih banyak produk untuk pencarian (bisa disesuaikan)
        const response = await fetch('https://dummyjson.com/products?limit=100&skip=0')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        
        const data = await response.json()
        
        // Format data sama seperti di ProductSection
        this.allProducts = (data.products || []).map(p => ({
          id: p.id,
          title: p.title,
          brand: p.brand,
          description: p.description,
          price: p.price,
          discountPercentage: p.discountPercentage,
          rating: p.rating,
          thumbnail: p.thumbnail || '/placeholder-product.png',
          category: p.category // Tambahan untuk pencarian
        }))
        
        console.log('Loaded products for search:', this.allProducts.length)
        
      } catch (error) {
        console.error('Error loading products for search:', error)
        this.allProducts = []
      }
    },
    
    // Search methods with API integration
    onSearchFocus() {
      this.isSearchFocused = true
      this.showSuggestions = true
      this.selectedIndex = -1
      this.$emit('search-focus', true)
      this.hideCatImmediate()
    },
    onSearchBlur() {
      this.isSearchFocused = false
      setTimeout(() => {
        if (!this.isSearchFocused) {
          this.hideSuggestions()
        }
      }, 150)
      this.$emit('search-focus', false)
    },
    onSearchInput() {
      this.selectedIndex = -1
      if (!this.showSuggestions) {
        this.showSuggestions = true
      }
      
      // Debounce search
      this.clearSearchTimeout()
      if (this.searchQuery.trim()) {
        this.searchTimeout = setTimeout(() => {
          this.fetchSuggestions()
        }, 300)
      } else {
        this.apiSuggestions = []
      }
    },
    
    // Filter produk dari cache berdasarkan query
    fetchSuggestions() {
      if (!this.searchQuery.trim()) {
        this.apiSuggestions = []
        return
      }
      
      this.isLoadingSuggestions = true
      
      try {
        const query = this.searchQuery.toLowerCase()
        
        // Filter produk dari cache
        this.apiSuggestions = this.allProducts
          .filter(product => {
            return (
              product.title.toLowerCase().includes(query) ||
              product.brand?.toLowerCase().includes(query) ||
              product.category?.toLowerCase().includes(query) ||
              product.description?.toLowerCase().includes(query)
            )
          })
          .slice(0, 8) // Limit 8 suggestions
          
      } catch (error) {
        console.error('Error filtering suggestions:', error)
        this.apiSuggestions = []
      } finally {
        this.isLoadingSuggestions = false
      }
    },
    
    async handleSearch() {
      if (!this.searchQuery.trim()) return
      
      this.isLoading = true
      this.addToHistory(this.searchQuery.trim())
      
      try {
        await this.performSearch(this.searchQuery.trim())
        this.hideSuggestions()
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        this.isLoading = false
      }
    },
    
    async performSearch(query) {
      console.log('Searching for:', query)
      
      try {
        const queryLower = query.toLowerCase()
        
        // Filter semua produk berdasarkan query
        const results = this.allProducts.filter(product => {
          return (
            product.title.toLowerCase().includes(queryLower) ||
            product.brand?.toLowerCase().includes(queryLower) ||
            product.category?.toLowerCase().includes(queryLower) ||
            product.description?.toLowerCase().includes(queryLower)
          )
        })
        
        // Emit hasil pencarian ke parent component
        this.$emit('search-results', {
          query: query,
          results: results,
          total: results.length
        })
        
        // Juga emit event search
        this.$emit('search', {
          query: query,
          type: 'search'
        })
        
      } catch (error) {
        console.error('Search error:', error)
        this.$emit('search-error', { query, error })
      }
    },
    
    selectSuggestion(item = null) {
      const selected = item || this.getSelectedItem()
      if (selected) {
        if (typeof selected === 'string') {
          // History item
          this.searchQuery = selected
        } else {
          // Product object
          this.searchQuery = selected.title
        }
        this.handleSearch()
      }
    },
    
    selectProduct(product) {
      // Emit product selection event
      this.$emit('product-selected', product)
      
      // Set search query dan tutup suggestions
      this.searchQuery = product.title
      this.hideSuggestions()
      
      // Bisa juga langsung perform search
      // this.handleSearch()
    },
    
    selectHistoryItem(item) {
      this.searchQuery = item
      this.handleSearch()
    },
    
    getSelectedItem() {
      if (this.selectedIndex === -1) return null
      
      if (this.searchQuery === '' && this.searchHistory.length > 0) {
        return this.searchHistory[this.selectedIndex]
      } else if (this.apiSuggestions.length > 0) {
        return this.apiSuggestions[this.selectedIndex]
      }
      return null
    },
    
    navigateDown() {
      const maxIndex = this.searchQuery === '' 
        ? this.searchHistory.length - 1 
        : this.apiSuggestions.length - 1
      
      if (this.selectedIndex < maxIndex) {
        this.selectedIndex++
      }
    },
    
    navigateUp() {
      if (this.selectedIndex > 0) {
        this.selectedIndex--
      } else {
        this.selectedIndex = -1
      }
    },
    
    hideSuggestions() {
      this.showSuggestions = false
      this.selectedIndex = -1
      this.apiSuggestions = []
      this.clearSearchTimeout()
    },
    
    // History methods
    addToHistory(query) {
      const history = this.searchHistory.filter(item => item !== query)
      history.unshift(query)
      this.searchHistory = history.slice(0, 10)
      this.saveSearchHistory()
    },
    
    removeFromHistory(index) {
      this.searchHistory.splice(index, 1)
      this.saveSearchHistory()
    },
    
    clearHistory() {
      this.searchHistory = []
      this.saveSearchHistory()
    },
    
    loadSearchHistory() {
      try {
        const saved = localStorage.getItem('searchHistory')
        if (saved) {
          this.searchHistory = JSON.parse(saved)
        }
      } catch (e) {
        console.warn('Failed to load search history:', e)
      }
    },
    
    saveSearchHistory() {
      try {
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      } catch (e) {
        console.warn('Failed to save search history:', e)
      }
    },
    
    highlightMatch(text) {
      if (!this.searchQuery || !text) return text
      const regex = new RegExp(`(${this.searchQuery})`, 'gi')
      return text.replace(regex, '<strong>$1</strong>')
    },
    
    // Animation methods
    onEnter(el) { el.style.height = '0px'; const h = el.scrollHeight; requestAnimationFrame(()=>{ el.style.height = h+'px' }) },
    afterEnter(el) { el.style.height = 'auto' },
    onLeave(el) { el.style.height = el.scrollHeight+'px'; requestAnimationFrame(()=>{ el.style.height='0px' }) },
    afterLeave(el) { el.style.height='0px' }
  }
}
</script>

<style scoped>
/* ...existing styles... */
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

/* Search Styles */
.navbar-main__search-wrapper {
  position: relative;
  flex: 1 1 auto;
  margin: 0 16px;
}

.navbar-main__search { 
  width: 100%;
}

.navbar-main__search-group { 
  width:100%; 
}

.navbar-main__search-input {
  height:40px;
  border-radius:10px 0 0 10px;
  font-size:14px;
  background: #f0f0f0;
  border: 1px solid #e0e0e0;
}

.navbar-main__search-input:focus {
  background: #fff;
  border-color: #d3161c;
  box-shadow: none;
}

.navbar-main__search-input:disabled {
  background: #f5f5f5;
  opacity: 0.7;
}

.navbar-main__search-button {
  height:40px;
  border-radius:0 10px 10px 0;
  padding:0 18px;
  background:#d3161c;
  border-color:#d3161c;
}

.navbar-main__search-button:hover,
.navbar-main__search-button:focus {
  background: #b91419;
  border-color: #b91419;
}

.navbar-main__search-button:disabled {
  background: #ccc;
  border-color: #ccc;
}

/* Search Suggestions */
.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1001;
}

.suggestions-section {
  padding: 8px 0;
}

.suggestions-section:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.suggestions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

.clear-history {
  background: none;
  border: none;
  color: #d3161c;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}

.clear-history:hover {
  text-decoration: underline;
}

.loading-suggestions {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  color: #666;
  font-size: 14px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.suggestion-item:hover,
.suggestion-item.active {
  background: #f8f8f8;
}

.suggestion-icon {
  color: #999;
  font-size: 14px;
  flex-shrink: 0;
}

.suggestion-item span {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.remove-history {
  opacity: 0;
  transition: opacity 0.15s;
  cursor: pointer;
  color: #999;
  font-size: 12px;
  padding: 4px;
}

.suggestion-item:hover .remove-history {
  opacity: 1;
}

/* Product Item Styles */
.product-item {
  padding: 12px 16px;
}

.product-image {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.no-image {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-title {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.product-price {
  font-size: 14px;
  font-weight: 600;
  color: #d3161c;
}

.no-results {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 16px;
  color: #666;
  font-size: 14px;
}

/* Highlight matched text */
.product-title strong,
.suggestion-item strong {
  color: #d3161c;
  font-weight: 600;
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

.product-brand {
  font-size: 12px;
  color: #888;
  margin-bottom: 2px;
  font-weight: 500;
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
  
  .navbar-main__search-wrapper {
    margin: 0 8px;
  }
}
</style>