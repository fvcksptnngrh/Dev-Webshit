<style scoped>
.topbar {
  background: #fff;
  min-height: 36px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 1001;
}

.topbar__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 8px;
}

.topbar__left {
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font: inherit;
  -webkit-appearance: none;
  appearance: none;
}

.topbar__icon {
  font-size: 14px;
  color: #6c757d;
  transform: translateY(-1px);
}

.topbar__label {
  font-size: 13px;
  color: #6c757d;
  margin-right: 4px;
}

.topbar__location {
  font-size: 13px;
  font-weight: 600;
  color: #222;
  margin-left: 2px;
}

.topbar__right {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 8px;
}

.custom-dropdown {
  position: relative;
}

.topbar__link{
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 0;
  color: #6c757d;
  font-size: 13px;
  cursor: pointer;
}

.topbar__link:focus{
  outline: none;
  box-shadow: none;
}

.topbar__link:hover{
  color: #343a40;
}
.app-download-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  z-index: 10;

  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  display: flex ;
  gap: 16px;
  padding: 12px;
}

.app-download-dropdown__qr img {
  display: block;
  width: 135px;
  height: 135px;
  border: 2px solid #d3161c;
  border-radius: 6px;
}

.app-download-dropdown__links {
  display: flex;
  flex-direction: column;
}

.app-download-dropdown__links p {
  font-size: 13px;
  color: #333;
  margin-bottom: 10px;
}

.app-download-dropdown__links .store-badge {
  display: block;
  margin-bottom: 8px;
}

.app-download-dropdown__links .store-badge:last-child {
  margin-bottom: 0;
}

.app-download-dropdown__links .store-badge img {
  height: 40px;
  width: auto;
}

@media (max-width: 768px) {
  .topbar__right .topbar__link:nth-child(2) { display: none; }
}
</style>

<template>
  <b-navbar type="light" variant="light" class="border-bottom topbar">
    <b-container fluid class="topbar__container">
        <button class="topbar__left" @click="isLocationModalOpen = true">
          <b-icon icon="geo-alt-fill" class="topbar__icon" />
          <span class="topbar__label">Kirim ke:</span>
          <span class="topbar__location">kos</span>
        </button>
      <div class="topbar__right">
        <span class="topbar__link">Layanan Pelanggan</span>
        <span class="topbar__link">Jelajahi Alfagift</span>
      <div class="custom-dropdown">
          <!-- Tombol Pemicu -->
          <button class="topbar__link" @click="toggleDropdown">
            <b-icon icon="phone" class="topbar__icon" />
            <span>Download Alfagift App</span>
          </button>
          <div v-if="isDropdownOpen" class="app-download-dropdown">
            <div class="app-download-dropdown__qr">
              <img src="/qr-alfa.jpg" alt="QR Code" />
            </div>
            <div class="app-download-dropdown__links">
              <p>Scan QR atau <br>download dari:</p>
              <a href="https://play.google.com/store/apps/details?id=com.alfamart.alfagift" class="store-badge">
                <img src="/play-store-btn.png" alt="Google Play Store" />
              </a>
              <a href="https://apps.apple.com/id/app/alfagift-alfamart-online-shop/id1013717463" class="store-badge">
                <img src="/app-store-btn.png" alt="Apple App Store" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </b-navbar>
</template>


<script>
export default {
  name: "TopNavbar",
  data(){
    return{
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    CloseDropdown() {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.CloseDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.CloseDropdown);
  }
};
</script>