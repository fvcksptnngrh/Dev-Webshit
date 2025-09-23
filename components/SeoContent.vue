<template>
  <section class="site-content">
    <div class="site-content__inner">
      <h2>Alfagift, Toko Belanja Online Grocery dari Alfamart</h2>
      <p>
        Alfamart adalah salah satu perusahaan ritel minimarket terkemuka yang telah hadir memberikan kemudahan dan kenyamanan berbelanja
         selama puluhan tahun untuk masyarakat Indonesia. Berbekal pengalaman tersebut dan kemauan untuk terus berkembang memberikan yang 
         terbaik bagi pelanggan setianya, lahirlah Alfagift, toko online yang jual puluhan ribu pilihan produk kebutuhan sehari-hari dengan kategori 
         yang beragam. Misalnya, makanan dan minuman, bahan masakan, perlengkapan bayi dan anak, perlengkapan rumah tangga, produk kecantikan dan kesehatan, dan masih banyak lagi. 
         Toko Alfamart online Alfagift akan menjadi tempat belanja online grocery yang terlengkap dan terpercaya di Indonesia.
      </p>

      <h2>Cara Belanja di Alfagift</h2>
      <p>
        Menyenangkan rasanya ketika bisa memenuhi kebutuhan sehari-hari hanya dengan menggerakkan jari di layar smartphone atau laptop dari rumah. 
        Tidak perlu lagi menghabiskan waktu lama dan menghadapi kemacetan di jalan untuk membeli produk belanja bulanan karena Alfagift hadir untuk membuat belanja online jadi dekat. 
        Sembari bersantai dan menikmati momen bersama keluarga, belanja kebutuhan sehari-hari dapat dilakukan dengan beberapa klik melalui desktop
        atau pun aplikasi Alfagift user friendly yang dapat dengan mudah diunduh atau didownload di Google Playstore dan Apple App Store. Semua dapat dilakukan dari hampir seluruh daerah di penjuru Indonesia karena toko Alfamart telah hadir di ribuan titik nusantara. Menjadikannya payment point, pickup point, hingga warehouse yang melayani pengiriman sehingga pesanan dapat sampai jauh lebih cepat. Didukung layanan pengiriman cepat same day dan gratis ongkir.
      </p>

      <h2>Beragam Promo Super Hemat</h2>
      <p>
        Ada begitu banyak program promo dan diskon produk menarik yang dapat dinikmati setiap hari di toko online terpercaya Alfagift. Membantu Anda untuk lebih hemat dan cermat dalam mengatur pengeluaran. Seluruh promo yang bisa dinikmati di toko, seperti JSM Alfamart, promo dwi mingguan (PDM), dan voucher Alfamart yang hemat juga dapat dinikmati di Alfagift dengan keuntungan yang sama. Selain itu, juga ada promo member, official store, promo payday, promo bank, ramadhan, liburan, lebaran, natal, tahun baru, harga spesial, kupon belanja, dan cashback yang bisa dinikmati oleh seluruh pelanggan.
      </p>

      <h2>Kemudahan Bertransaksi</h2>
      <p>
 Bersama dengan semua itu, Alfagift juga menyediakan kemudahan bertransaksi melalui kartu kredit (Visa, Master Card, dan JCB), transfer via ATM, internet, dan online banking, GoPay, ShopeePay, dan Virgo. Lengkap dengan fasilitas menarik lainnya, seperti bayar di tempat atau cash on delivery (COD) dan pay at store (PAS), gratis ongkir, ambil di toko, hingga layanan pesan antar Alfamart yang memungkinkan pesanan diterima di hari yang sama. Informasi lengkap lainnya bisa diakses dengan mudah melalui blog Alfamart yang juga memuat artikel / tips dengan topik dan tema menarik setiap hari.
      </p>
    </div>
  </section>
</template>

<script>
export default { name: 'SeoContent' }
</script>

<style scoped>
.site-content { 
  background:#f2f2f2;
  color:#222; 
  min-height: calc(100vh - 72px);
  display: flex;
  }
.site-content__inner{
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 12px;
  flex: 1;
  overflow: auto;
}
.site-content h2{
  color:#4a4a4a;
  font-size: 10px;
  font-weight: 600;
  margin: 28px 0 12px;
}
.site-content p{
  font-size: 15px;
  line-height: 1.7;
  color:#4a4a4a;
  margin: 0 0 16px;
}

/* sedikit lebih lega di desktop besar */
@media (min-width: 1200px){
  .site-content__inner{ padding: 40px 16px; }
  .site-content h2{ font-size: 26px; margin-top: 30px; }
}
</style>
```