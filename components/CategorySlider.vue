<template>
  <div class="category-slider">
    <div class="category-slider__container">
      <button
        class="nav-btn nav-btn--prev"
        @click="prev"
        :disabled="isAnimating"
        aria-label="Sebelumnya"
      >
        <span class="nav-arrow">‹</span>
      </button>

      <div class="category-slider__viewport" ref="viewport">
        <div
          ref="track"
          class="category-slider__track"
          :class="{ 'no-animate': isJumping }"
          :style="{ transform: `translate3d(-${offset}px,0,0)` }"
          @transitionend="onTransitionEnd"
        >
          <div
            v-for="(c, i) in displayItems"
            :key="i"
            ref="chip" ref-in-for
            class="category-chip"
          >
            <b-icon :icon="c.icon" class="category-chip__icon" />
            <span class="category-chip__text">{{ c.label }}</span>
          </div>
        </div>
      </div>
      <button
        class="nav-btn nav-btn--next"
        @click="next"
        :disabled="isAnimating"
        aria-label="Berikutnya"
      >
        <span class="nav-arrow">›</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategorySlider',
  data() {
    return {
      realIndex: 0,
      vIndex: 0,
      isJumping: false,
      isAnimating: false,
      gap: 16,
      viewportWidth: 0,
      widths: [],
      prefix: [0],
      categories: [
        { label: 'Produk Segar & Beku', icon: 'basket' },
        { label: 'Personal Care', icon: 'person' },
        { label: 'Kebutuhan Kesehatan', icon: 'heart' },
        { label: 'Lifestyle', icon: 'star' },
        { label: 'Pet Foods', icon: 'emoji-smile' },
        { label: 'Kebutuhan Dapur', icon: 'house' },
        { label: 'Kebutuhan Ibu dan Anak', icon: 'people' },
        { label: 'Makanan', icon: 'bag' },
        { label: 'Minuman', icon: 'cup-straw' }
      ]
    }
  },
  computed: {
    visibleCount() {
      if (!this.viewportWidth) return 1
      const approxChip = 200
      return Math.max(1, Math.floor((this.viewportWidth + this.gap) / (approxChip + this.gap)))
    },
    cloneCount() { return Math.max(this.visibleCount + 4, 6) },
    startIndex() { return this.cloneCount },
    displayItems() {
      const left = this.categories.slice(-this.cloneCount)
      const right = this.categories.slice(0, this.cloneCount)
      return [...left, ...this.categories, ...right]
    },
    offset() { return this.prefix[this.vIndex] || 0 }
  },
  mounted() {
    this.measure()
    this.vIndex = this.startIndex + this.realIndex
    this.$nextTick(this.buildPrefix)
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() { window.removeEventListener('resize', this.onResize) },
  methods: {
    onResize() {
      this.measure()
      this.$nextTick(() => {
        this.buildPrefix(async () => {
          await this.jumpSilently(this.startIndex + this.realIndex)
        })
      })
    },
    measure() { this.viewportWidth = this.$refs.viewport?.clientWidth || 0 },
    buildPrefix(done) {
      const nodes = Array.isArray(this.$refs.chip) ? this.$refs.chip : []
      this.widths = nodes.map(el => el.offsetWidth)
      const prefix = [0]
      for (let i = 1; i < this.widths.length; i++) {
        prefix[i] = prefix[i - 1] + this.widths[i - 1] + this.gap
      }
      this.prefix = prefix
      if (done) done()
    },

    next() {
      if (this.isAnimating || this.isJumping) return
      this.isAnimating = true
      this.realIndex = (this.realIndex + 1) % this.categories.length
      this.vIndex += 1
    },
    prev() {
      if (this.isAnimating || this.isJumping) return
      this.isAnimating = true
      this.realIndex = (this.realIndex - 1 + this.categories.length) % this.categories.length
      this.vIndex -= 1
    },

    async onTransitionEnd() {
      const middleStart = this.startIndex
      const middleEnd = this.startIndex + this.categories.length - 1
      if (this.vIndex > middleEnd) {
        await this.jumpSilently(this.vIndex - this.categories.length)
      } else if (this.vIndex < middleStart) {
        await this.jumpSilently(this.vIndex + this.categories.length)
      }
      this.isAnimating = false
    },

    jumpSilently(toIndex) {
      return new Promise(resolve => {
        this.isJumping = true
        this.vIndex = toIndex
        this.$nextTick(() => {
          void (this.$refs.track && this.$refs.track.offsetWidth)
          requestAnimationFrame(() => {
            this.isJumping = false
            resolve()
          })
        })
      })
    }
  }
}
</script>


<style scoped>
.category-slider { --chip-h: 44px; }
.category-slider__container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0 56px;
}

.category-slider__viewport {
  overflow: hidden;
  height: var(--chip-h);
  position: relative;
  display: flex; align-items: center;
}

.category-slider__track {
  display: flex;
  gap: 16px;
  transition: transform .35s ease;
  will-change: transform;
  backface-visibility: hidden;
}

.category-slider__track.no-animate { transition: none !important; }

.category-chip {
  flex: 0 0 auto;
  height: 44px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  background: #fff;
  color: #6c757d;
  box-shadow: 0 2px 8px rgba(0,0,0,.06);
  border: 1px solid #f0f0f0;
  white-space: nowrap;
}

.category-chip__icon { color: #d3161c; font-size: 18px; }
.category-chip__text { font-size: 14px; }

.nav-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 44px; height: 44px; border-radius: 50%;
  border: none; background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,.12);
  display: grid; place-items: center;
  cursor: pointer; z-index: 2;
}

.nav-btn--prev { left: 6px; }
.nav-btn--next { right: 6px; }
.nav-arrow { 
    font-size: 35px;
    line-height: 1;
    color: #666; 
    
}

.nav-btn:disabled { 
   pointer-events: none;
   opacity: 0.4; }

@media (max-width: 992px) {
  .category-slider { --chip-h: 48px; }
}

@media (max-width: 576px)  {
  .category-slider { --chip-h: 42px; }
}

</style>