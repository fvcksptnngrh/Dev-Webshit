<template>
  <transition name="fade-pop">
    <div
      v-if="visible && product"
      class="add-popup"
      :style="popupStyle"
      role="alert"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <div class="add-popup__head">
        <strong>Berhasil menambahkan ke keranjang!</strong>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <div class="add-popup__body">
        <div class="prd">
          <img :src="product.thumbnail" :alt="product.title" />
          <div class="meta">
            <p class="title" :title="product.title">{{ product.title }}</p>
          </div>
        </div>
        <button class="btn-view" @click="$emit('view-cart')">
          Lihat Keranjang
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name:'AddToCartPopup',
  props:{
    product:Object,
    visible:Boolean,
    autoCloseMs:{ type:Number, default:2500 },
    placement:{ type:String, default:'top-mid' },
    navbarHeight:{ type:Number, default:72 },
    offsetY:{ type:Number, default:20 },
    yPercent:{ type:Number, default:32 }
  },
  data(){ return { timer:null, remaining:0, startTs:0 } },
  computed:{
    popupStyle(){
      switch(this.placement){
        case 'center':
          return { top:'50%', left:'50%', transform:'translate(-50%,-50%)' }
        case 'bottom':
          return { bottom:this.offsetY+'px', left:'50%', transform:'translateX(-50%)' }
        case 'top':
          return {
            top: (this.navbarHeight + this.offsetY) + 'px',
            left:'50%',
            transform:'translateX(-50%)'
          }
        case 'top-mid':
        default:
          return {
            top:`${this.yPercent}vh`,
            left:'50%',
            transform:'translateX(-50%)'
          }
      }
    }
  },
  watch:{ visible(v){ v ? this.start() : this.clear() } },
  beforeDestroy(){ this.clear() },
  methods:{
    start(){
      this.clear()
      this.remaining = this.autoCloseMs
      this.startTs = Date.now()
      this.timer = setTimeout(()=>this.$emit('close'), this.remaining)
    },
    pause(){
      if(!this.timer) return
      clearTimeout(this.timer)
      this.timer=null
      this.remaining -= Date.now() - this.startTs
    },
    resume(){
      if(this.timer || !this.visible) return
      this.startTs = Date.now()
      this.timer = setTimeout(()=>this.$emit('close'), this.remaining)
    },
    clear(){
      if(this.timer) clearTimeout(this.timer)
      this.timer=null
    }
  }
}
</script>

<style scoped>
.add-popup{
  position:fixed;
  width:520px;
  max-width:92vw;
  background:#fff;
  border:1px solid #e2e2e2;
  border-radius:12px;
  box-shadow:0 8px 28px rgba(0,0,0,.12);
  padding:16px 18px 18px;
  z-index:1200;
  font-size:14px;
}

.add-popup__head{
  display:flex;
  justify-content:space-between;
  margin-bottom:14px;
  font-size:15px;
}

.close-btn{
  background:none;
  border:0;
  font-size:20px;
  line-height:1;
  cursor:pointer;
  color:#555;
}

.add-popup__body{
  display:flex;
  align-items:center;
  gap:14px;
  border:1px solid #eee;
  border-radius:10px;
  padding:12px 14px;
}

.prd{
  display:flex;
  gap:12px;
  align-items:center;
  flex:1;
}

.prd img{
  width:64px;
  height:64px;
  object-fit:contain;
  border:1px solid #f3f3f3;
  border-radius:8px;
  background:#fff;
}

.prd .title{
  margin:0;
  font-weight:600;
  line-height:1.3;
  max-height:2.6em;
  overflow:hidden;
}

.btn-view{
  background:#d3161c;
  color:#fff;
  border:0;
  padding:10px 18px;
  font-weight:600;
  border-radius:10px;
  cursor:pointer;
  font-size:13px;
}

.btn-view:hover{ background:#b81419; }

.fade-pop-enter-active,
.fade-pop-leave-active{
  transition:opacity .25s, transform .25s;
}

.fade-pop-enter-from,
.fade-pop-leave-to{
  opacity:0;
  transform:translateX(-50%) translateY(-10px);
}

@media (max-width:600px){
  .add-popup{ width:100%; }
}

</style>