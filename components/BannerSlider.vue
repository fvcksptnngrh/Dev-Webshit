<template>
  <b-container fluid class="p-0 banner-section">
    <b-carousel
      id="multi-banner-carousel"
      v-model="current"
      controls
      :indicators="false"
      background="#ffffff"
      :interval="4000"
      class="hover-controls"
    >
      <b-carousel-slide v-for="(slide, index) in slides" :key="index">
        <template #img>
          <b-row no-gutters>
            <b-col
              v-for="(banner, i) in slide"
              :key="i"
              cols="6"
              class="px-2"
            >
              <a :href="banner.link">
                <b-img
                  :src="banner.image"
                  fluid
                  :alt="banner.alt"
                  class="banner-img"
                />
              </a>
            </b-col>
          </b-row>
        </template>
      </b-carousel-slide>
    </b-carousel>

  <div class="banner-footer">
      <ul class="banner-dots" role="tablist">
        <li
          v-for="(s, i) in slides"
          :key="i"
          :class="['banner-dot', { active: i === current }]"
          @click="current = i"
          @keydown.enter.space="current = i"
          role="button"
          tabindex="0"
          :aria-label="`Slide ${i + 1}`"
        />
      </ul>

      <a href="#" class="lihat-semua-link">Lihat Semua &gt;</a>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
    current: 0,
      banners: [
        { image: "/banner.jpeg", link: "#", alt: "Promo 1" },
        { image: "/banner1.jpeg", link: "#", alt: "Promo 1" },
        { image: "/banner4.jpeg", link: "#", alt: "Promo 2" },
        { image: "/banner3.jpeg", link: "#", alt: "Promo 3" },
        { image: "/banner2.jpeg", link: "#", alt: "Promo 4" },
        { image: "/banner5.jpeg", link: "#", alt: "Promo 5" },
        { image: "/banner6.jpeg", link: "#", alt: "Promo 6" },
        { image: "/banner7.jpeg", link: "#", alt: "Promo 7" },
        { image: "/banner8.jpeg", link: "#", alt: "Promo 8" },
        { image: "/banner9.jpeg", link: "#", alt: "Promo 9" },
        { image: "/kopi.jpeg", link: "#", alt: "Promo 10" },
        { image: "/ovo.jpeg", link: "#", alt: "Promo 11" },
        { image: "/Sejagat.jpeg", link: "#", alt: "Promo 12" },
        { image: "/Umroh.jpeg", link: "#", alt: "Promo 13" },


      ]
    }
  },
  computed: {
    slides() {
      const result = []
      for (let i = 0; i < this.banners.length; i += 2) {
        result.push(this.banners.slice(i, i + 2))
      }
      return result
    }
  }
}
</script>

<style>
.banner-section {
  max-width: 1200px;
  margin: 20px auto;
}

.banner-img {
  border-radius: 8px;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.lihat-semua {
  text-align: right;
  margin-top: 10px;
}

.lihat-semua a {
  color: #007bff;
  font-size: 14px;
  text-decoration: none;
}

.banner-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 20px;
}

.banner-dots {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.banner-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d9d9d9;
  cursor: pointer;
}

.banner-dot.active {
  background: #d80000;
}


.lihat-semua-link {
  color: #007bff;
  font-size: 14px;
  text-decoration: none;
}

.hover-controls .carousel-control-prev,
.hover-controls .carousel-control-next {
  opacity: 0;
  transition: opacity 0.3s;
}

.hover-controls:hover .carousel-control-prev,
.hover-controls:hover .carousel-control-next {
  opacity: 1;
  pointer-events: auto;
}

.banner-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #bfbfbf;
  border: 2px solid #bfbfbf;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.banner-dot.active {
  background: #d80000;
  border-color: #d80000;
}

.lihat-semua-link:hover { text-decoration: underline; }

#multi-banner-carousel .carousel-inner { overflow: hidden; border-radius: 8px; }
#multi-banner-carousel .carousel-item { transition: transform .6s ease-in-out; }

</style>