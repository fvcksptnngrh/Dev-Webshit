<template>
  <transition name="slide-fade">
    <div
      v-if="visible"
      class="info-toast"
      :class="type"
      role="status"
      :style="toastStyle"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <span>{{ message }}</span>
      <button class="close" @click="$emit('close')">×</button>
    </div>
  </transition>
</template>

<script>
export default {
  name:'InfoToast',
  props:{
    message:String,
    visible:Boolean,
    autoCloseMs:{ type:Number, default:1800 },
    placement:{ type:String, default:'top-mid' },
    navbarHeight:{ type:Number, default:72 },
    offsetY:{ type:Number, default:20 },
    yPercent:{ type:Number, default:32 },
    type:{ type:String, default:'info' }
  },
  data(){ return { timer:null, remaining:0, startTs:0 } },
  computed:{
    toastStyle(){
      switch(this.placement){
        case 'center':
          return { top:'50%', left:'50%', transform:'translate(-50%,-50%)' }
        case 'bottom':
          return { bottom:this.offsetY+'px', left:'50%', transform:'translateX(-50%)' }
        case 'top':
          return {
            top:(this.navbarHeight + this.offsetY)+'px',
            left:'50%',
            transform:'translateX(-50%)'
          }
        case 'top-mid':
        default:
          return {
            top:this.yPercent+'vh',
            left:'50%',
            transform:'translateX(-50%)'
          }
      }
    }
  },
  watch:{
    visible(v){ v ? this.start() : this.clear() }
  },
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
.info-toast{
  position:fixed;
  background:#e9f6fa;
  color:#0b4453;
  border:1px solid #b7e2ee;
  padding:10px 16px;
  border-radius:8px;
  font-size:14px;
  display:flex;
  align-items:center;
  gap:12px;
  box-shadow:0 4px 16px rgba(0,0,0,.12);
  z-index:1190;
  max-width:420px;
}

.info-toast.success{ 
  background:#e9f9ec; 
  border-color:#b6e6c1; 
  color:#135d28; 
}

.info-toast.error{ 
  background:#fdecec; 
  border-color:#f5c2c2; 
  color:#7d1f1f; 
}

.close{
  background:none; 
  border:0; 
  font-size:18px; 
  cursor:pointer; 
  color:inherit; 
  line-height:1;
}

.slide-fade-enter-active,.slide-fade-leave-active{ 
  transition:.25s; 
}

.slide-fade-enter-from,.slide-fade-leave-to{ 
  opacity:0; 
  transform:translateX(-50%) translateY(-8px); 
}

@media (max-width:600px){
  .info-toast{ width:92vw; max-width:none; }
}

</style>