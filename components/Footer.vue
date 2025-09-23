<template>
  <footer class="site-footer">
    <div class="footer__inner">
      <div class="footer__grid">       
        <div class="f-col">
          <h3 class="f-title">Layanan Pelanggan</h3>
          <ul class="f-list">
            <li><nuxt-link to="#">Pertanyaan Umum</nuxt-link></li>
            <li><nuxt-link to="#">Cara Belanja</nuxt-link></li>
            <li><nuxt-link to="#">A-Poin</nuxt-link></li>
            <li><nuxt-link to="#">Gratis Ongkir</nuxt-link></li>
            <li><nuxt-link to="#">Beli Voucher</nuxt-link></li>
          </ul>
        </div>
        <div class="f-col">
          <h3 class="f-title">Jelajahi Alfagift</h3>
          <ul class="f-list">
            <li><nuxt-link to="#">Tentang Alfagift</nuxt-link></li>
            <li><nuxt-link to="#">Syarat & Ketentuan</nuxt-link></li>
            <li><nuxt-link to="#">Kebijakan Privasi</nuxt-link></li>
            <li><nuxt-link to="#">Karir</nuxt-link></li>
            <li><nuxt-link to="#">Blog</nuxt-link></li>
          </ul>
        </div>
        <div class="f-col">
          <h3 class="f-title">Metode Pembayaran</h3>
          <div class="f-logos">
            <img src="/COD.png" alt="COD" />
            <img src="/bca.png" alt="BCA" />
            <img src="/MANDIRI.png" alt="Mandiri" />
            <img src="/Credit_Card.png" alt="Credit Card" />
          </div>
          <h3 class="f-title mt-4">Layanan Pengiriman</h3>
          <div class="f-logos">
            <img src="/Layanan-Pengiriman.webp" alt="Kurir" />
          </div>
        </div>
        <div class="f-col">
          <h3 class="f-title">Ikuti Kami</h3>
          <div class="f-social">
            <a href="https://www.facebook.com/share/15ysryphZV/?mibextid=wwXIfr"><img src="/Facebook.png" alt="Facebook" /></a>
            <a href="https://x.com/alfagift_idn?s=11"><img src="/Twitter.png" alt="Twitter" /></a>
            <a href="https://www.instagram.com/alfagift_idn?igsh=MXRubGZrODNkbWhjdg=="><img src="/Instagram.png" alt="Instagram" /></a>
          </div>
 <h3 class="f-title mt-4">Hubungi Kami</h3>
<ul class="f-contact list-unstyled">
  <li>
    <b-icon icon="envelope-fill" class="mr-2"></b-icon>
    alfacare@sat.co.id
  </li>
  <li>
    <b-icon icon="telephone-fill" class="mr-2"></b-icon>
    1500-959
  </li>
</ul>
        </div>
        <div class="f-col f-col--complaint">
          <h3 class="f-title">Layanan Pengaduan Konsumen</h3>
          <div class="f-complaint">
            <p class="f-company">PT. Sumber Alfaria Trijaya, Tbk</p>
            <p class="f-inline">Email : alfacare@sat.co.id</p>
            <p class="f-inline">Call Center : 1500-959</p>
            <p class="f-ministry">
              Direktorat Jenderal Perlindungan Konsumen<br />
              dan Tertib Niaga Kementerian Perdagangan<br />
              Republik Indonesia
            </p>
            <p class="f-wa">Whatsapp Ditjen PKTN: 0853 1111 1010</p>
            <div class="f-stores">
              <a href="https://play.google.com/store/apps/details?id=com.alfamart.alfagift" class="store-badge">
                <img src="/play-store-btn.png" alt="Google Play Store" />
              </a>
              <a href="https://apps.apple.com/id/app/alfagift-alfamart-online-shop/id1013717463" class="store-badge">
                <img src="/app-store-btn.png" alt="Apple App Store" />
              </a>
            </div>
              <div class="footer__bottom">
            © 2022, PT. Sumber Alfaria Trijaya
              </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #fff;
  color: #222;
  border-top: 1px solid #eee;
  font-size: 14px;
}

.footer__inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 48px 16px 32px;
}

.footer__grid {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1.6fr;
}
.f-col { 
  min-width: 0; 
}

.f-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px;
  color: #222;
}

.f-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}

.f-list a {
  font-size: 13px;
  color: #5a5f63;
  text-decoration: none;
}

.f-list a:hover { 
  text-decoration: underline; 
}

.f-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  align-items: center;
}

.f-logos img {
  height: 28px;
  object-fit: contain;
}

.f-social {
  display: flex;
  gap: 12px;
  align-items: center;
}

.f-social img {
  height: 28px;
  width: 28px;
}

.f-contact {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: #5a5f63;
}

.f-col--complaint { 
  text-align: center; 
}

.f-col--complaint .f-title{
  justify-content: center;
}

.f-col--complaint .f-complaint {
  max-width: 320px;
  margin: 0 auto;
}

.f-col--complaint .f-company {
  color: #222;
  font-weight: 400;
  margin-bottom: 8px;
}

.f-col--complaint p {
  font-size: 13px;
  color: #5a5f63;
  margin: 2px 0;
  line-height: 1.35;
}

.f-col--complaint .f-ministry {
  margin-top: 16px;
  color: black;
}

.f-col--complaint .f-wa{
  color: #888;
  margin-bottom: 16px;
}

.f-col--complaint .f-stores {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 8px;
}

.f-col--complaint .f-stores img {
  height: 46px;
}

.footer__bottom {
  margin-top: 20px;
  font-size: 12px;
  color: #6b6f72;
}

@media (max-width: 1199px) {
  .footer__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
