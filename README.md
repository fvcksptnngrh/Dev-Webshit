# myAlfa

> mini project 1

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## 1. Arsitektur Proyek

Proyek ini menggunakan **Nuxt.js** (framework Vue.js) sebagai pondasi utama, seperti membangun rumah dengan kerangka yang sudah kokoh dan modular. Setiap bagian rumah (aplikasi) diwakili oleh folder dan komponen yang punya tugas spesifik.

### Struktur Utama:
- **components/**: Kumpulan "batu bata" UI, seperti Navbar, Footer, ProductCard, MiniCart, dsb. Setiap komponen bisa digunakan berulang di berbagai tempat.
- **layouts/**: "Kerangka rumah" yang mengatur tampilan global, misal layout default berisi header, konten, dan footer.
- **pages/**: "Ruangan" dalam rumah, setiap file di sini adalah halaman/route (misal: halaman utama, detail produk).
- **store/**: "Gudang" data global, menggunakan Vuex untuk mengelola state seperti keranjang belanja.
- **assets/** & **static/**: "Lemari" berisi gambar, ikon, dan file statis.
- **data/**: "Buku catatan" berisi data statis, misal info footer.

## 2. Algoritma & Logika Utama

### a. Keranjang Belanja (store/cart.js)
- **Struktur data:**
	- `items`: Objek berisi produk dan jumlahnya di keranjang.
- **Algoritma utama:**
	- Saat user klik "Beli", store akan cek apakah produk sudah ada di keranjang:
		- Jika belum, produk ditambah dengan qty 1.
		- Jika sudah, qty produk bertambah.
	- User bisa tambah/kurang qty di MiniCart atau ProductCard:
		- Jika qty dikurangi sampai 0, produk dihapus dari keranjang.
	- Getter seperti `totalItems`, `itemsList`, dan `totalPrice` digunakan untuk menampilkan ringkasan keranjang di UI.

### b. Pengambilan & Penampilan Produk
- **ProductSection.vue**: Mengambil data produk dari API, menampilkan dalam grid, dan menyediakan tombol "Lihat Selengkapnya".
- **ProductGrid.vue**: Menampilkan daftar produk yang sudah diberikan lewat props, serta mengelola popup dan toast untuk feedback user.
- **ProductCard.vue**: Menampilkan satu produk, tombol beli, dan kontrol qty.

## 3. Interaksi Antar Komponen (Perumpamaan)

Bayangkan aplikasi ini seperti supermarket:
- **ProductCard** adalah rak produk. User bisa ambil barang (klik beli), tambah/kurang jumlah, atau lihat detail.
- **MiniCart** adalah keranjang belanja yang selalu mengikuti user. Setiap kali user ambil barang dari rak, keranjang langsung update isinya.
- **CartBadge** adalah indikator di keranjang, menunjukkan berapa banyak barang yang sudah diambil.
- **ProductSection/ProductGrid** adalah lorong-lorong di supermarket, menampilkan banyak rak produk sekaligus.
- **Footer** adalah papan informasi di kasir, berisi info kontak, pembayaran, dan sosial media.

### Alur Interaksi:
1. User klik "Beli" di ProductCard → store/cart.js update data keranjang.
2. MiniCart dan CartBadge otomatis update karena membaca data dari store.
3. User bisa tambah/kurang qty di MiniCart atau ProductCard, perubahan langsung terlihat di semua komponen terkait.
4. ProductSection dan ProductGrid menampilkan banyak ProductCard, dan meneruskan event interaksi ke parent atau memprosesnya sendiri (misal: tampilkan popup).

## 4. Penjelasan Komponen Utama

- **ProductCard.vue**: Komponen produk individual, emit event ke parent saat ada interaksi (beli, tambah/kurang qty, lihat detail).
- **ProductSection.vue**: Section produk dinamis, fetch data sendiri, meneruskan event ke parent.
- **ProductGrid.vue**: Grid produk statis, memproses event sendiri (tampilkan popup/toast).
- **MiniCart.vue**: Ringkasan isi keranjang, kontrol qty, dan total harga.
- **CartBadge.vue**: Indikator jumlah barang di keranjang, klik untuk membuka MiniCart.
- **Footer.vue**: Menampilkan info perusahaan, kontak, pembayaran, dan sosial media dari data/footer.js.

## 5. Best Practice & Keunggulan
- **Modular**: Komponen terpisah, mudah dikembangkan dan dipelihara.
- **Reusable**: Komponen bisa digunakan di banyak tempat.
- **State terpusat**: Vuex store memudahkan pengelolaan data global.
- **Responsive**: Layout dan komponen mendukung berbagai ukuran layar.
- **Integrasi BootstrapVue**: Memudahkan styling dan penggunaan komponen Bootstrap.

## 6. Cara Belajar & Memahami Kode
- Mulai dari **ProductCard.vue** untuk memahami interaksi produk.
- Lanjut ke **store/cart.js** untuk logika keranjang.
- Pelajari **MiniCart.vue** dan **CartBadge.vue** untuk tampilan keranjang.
- Lihat **ProductSection.vue** dan **ProductGrid.vue** untuk penampilan daftar produk dan alur event.
- Akhiri dengan **Footer.vue** untuk data statis dan info perusahaan.

---

**Ringkasan:**
Proyek ini seperti supermarket digital, di mana setiap komponen punya peran spesifik dan saling terhubung lewat "gudang" data (store). Dengan memahami alur interaksi dan struktur, Anda bisa dengan mudah mengembangkan atau mempelajari fitur baru di masa depan.
