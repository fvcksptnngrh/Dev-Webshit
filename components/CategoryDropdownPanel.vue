<template>
  <transition
    name="cat-slide"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <div
      v-if="visible"
      class="cat-panel"
      ref="panel"
      role="region"
      aria-label="Kategori"
      @keydown.esc.prevent="$emit('close')"

    >
      <div class="cat-panel__inner" ref="inner">
        <CategorySlider v-if="useSlider" />
        <div v-else class="cat-grid">
          <button
            v-for="c in categories"
            :key="c.id || c.slug || c.name"
            class="cat-item"
            @click="$emit('select', c)"
            
          >
            <img v-if="c.icon" :src="c.icon" :alt="c.name" />
            <span>{{ c.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CategorySlider from '~/components/CategorySlider.vue'

export default {
  name: 'CategoryDropdownPanel',
  components: { CategorySlider },
  props: {
    visible: Boolean,
    categories: { type: Array, default: () => [] },
    useSlider: { type: Boolean, default: true }
  },
  mounted() {
    document.addEventListener('mousedown', this.handleOutside)
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.handleOutside)
    window.removeEventListener('resize', this.onResize)
  },
  watch: {
    visible(v) {
      if (v) this.$nextTick(this.adjustOpenHeight)
    }
  },
  methods: {
    handleOutside(e) {
      if (!this.visible) return
      const panel = this.$refs.panel
      if (panel && !panel.contains(e.target)) this.$emit('close')
    },
    maxTargetHeight() {
      return Math.round(window.innerHeight * 0.6)
    },
    calcContentHeight() {
      const inner = this.$refs.inner
      if (!inner) return 0
      return inner.scrollHeight
    },
    targetHeight() {
      return Math.min(this.calcContentHeight(), this.maxTargetHeight())
    },
    onEnter(el) {
      el.style.height = '0px'
      const target = this.targetHeight()
      requestAnimationFrame(() => {
        el.style.height = target + 'px'
      })
    },
    onAfterEnter(el) {
      el.style.height = this.targetHeight() + 'px'
    },
    onLeave(el) {
      el.style.height = el.getBoundingClientRect().height + 'px'
      requestAnimationFrame(() => {
        el.style.height = '0px'
      })
    },
    onAfterLeave(el) {
      el.style.height = '0px'
    },
    adjustOpenHeight() {
      if (!this.visible || !this.$refs.panel) return
      this.$refs.panel.style.height = this.targetHeight() + 'px'
    },
    onResize() {
      this.adjustOpenHeight()
    },

  }
}
</script>

<style scoped>
.cat-panel {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  background: #fff;
  z-index: 990;
  border-bottom: 1px solid #eee;
  box-shadow: 0 6px 24px -4px rgba(0,0,0,.12);
  overflow: hidden;
  max-height: 60vh;
}

.cat-panel__inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 20px 32px;
  max-height: 60vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
}

.cat-panel__inner::-webkit-scrollbar {
  width: 8px;
}

.cat-panel__inner::-webkit-scrollbar-track {
  background: transparent;
}

.cat-panel__inner::-webkit-scrollbar-thumb {
  background: #d0d4d9;
  border-radius: 4px;
}

.cat-panel__inner::-webkit-scrollbar-thumb:hover {
  background: #b6bcc2;
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px 24px;
  padding: 8px 0;
}

.cat-item {
  background: none;
  border: 0;
  text-align: left;
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  gap: 12px;
  align-items: center;
  color: #333;
  border-radius: 8px;
  transition: background .18s;
}

.cat-item:hover {
  background: #f6f8fa;
}

.cat-item img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.cat-slide-enter-active,
.cat-slide-leave-active {
  transition: height .3s cubic-bezier(.4,0,.2,1), opacity .25s;
}

.cat-slide-enter-from,
.cat-slide-leave-to {
  opacity: 0;
}

@media (max-height: 600px) {
  .cat-panel,
  .cat-panel__inner {
    max-height: 50vh;
  }
}
</style>