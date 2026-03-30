<template>
  <v-container fluid class="pa-0 bg-white fill-height d-flex flex-column overflow-hidden">
    
    <v-row align="center" class="flex-grow-0 pt-4 px-6 pb-2" no-gutters>
      <v-col cols="auto">
        <v-btn
          variant="flat"
          color="grey-darken-3"
          rounded="pill"
          class="px-6 font-weight-bold"
          @click="router.back()"
        >
          << 戻る
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="flex-grow-1 d-flex flex-column align-center justify-center pa-4" no-gutters>
      
      <div class="qr-scan-frame-container mb-12">
        <div class="qr-scanner-placeholder d-flex align-center justify-center rounded-xl">
          <div class="corner top-left"></div>
          <div class="corner top-right"></div>
          <div class="corner bottom-left"></div>
          <div class="corner bottom-right"></div>
          
          <div class="scan-laser"></div>
          
          <v-icon
            icon="mdi-camera"
            size="100"
            color="grey-lighten-2"
          ></v-icon>
        </div>
      </div>

      <h1 class="qr-guide-text font-weight-black text-center text-grey-darken-3 px-4">
        QRコードをかざしてください
      </h1>

    </v-row>

    <v-overlay :model-value="loading" class="align-center justify-center" persistent>
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 実用化する際は、vue-qrcode-reader などをインポートします
// import { QrcodeStream } from 'vue-qrcode-reader'

const router = useRouter()
const loading = ref(false)

// FABのダミー関数（今回は非表示）
// const handleStaff = () => console.log("Staff")
// const handleQR = () => console.log("QR")
</script>

<style scoped>
/* コンテナ全体の設定 */
.overflow-hidden {
  overflow: hidden !important;
}

/* 案内テキストのレスポンシブ化 */
.qr-guide-text {
  /* 最小24px、最大40px、画面幅に応じて可変 */
  font-size: clamp(1.5rem, 5vw, 2.5rem) !important;
  line-height: 1.2;
}

/* --- QRスキャナー枠のデザイン --- */
.qr-scan-frame-container {
  /* 画面中央に配置。画面幅に合わせて可変、最大500px */
  width: clamp(250px, 80vw, 500px);
  max-width: 500px;
}

.qr-scanner-placeholder {
  position: relative;
  width: 100%;
  padding-bottom: 100%; /* 正方形を維持 */
  background-color: #f9f9f9;
  border: 4px solid #333; /* 太い外枠 */
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* 四隅の枠線（手書き風）を再現 */
.corner {
  position: absolute;
  width: 25%;
  height: 25%;
  border: 10px solid #333;
}

.top-left {
  top: 15px;
  left: 15px;
  border-right: none;
  border-bottom: none;
}

.top-right {
  top: 15px;
  right: 15px;
  border-left: none;
  border-bottom: none;
}

.bottom-left {
  bottom: 15px;
  left: 15px;
  border-right: none;
  border-top: none;
}

.bottom-right {
  bottom: 15px;
  right: 15px;
  border-left: none;
  border-top: none;
}

/* スキャンレーザーの演出 */
.scan-laser {
  position: absolute;
  top: 50px;
  left: 50px;
  right: 50px;
  height: 4px;
  background-color: #F44336; /* 赤色 */
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(244, 67, 54, 0.5);
  animation: scan 2s linear infinite;
  z-index: 10;
}

@keyframes scan {
  0%, 100% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100% - 100px));
  }
}

/* ダミーアイコンの配置 */
.qr-scanner-placeholder .v-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 戻るボタンの枠線を少し太く */
:deep(.v-btn--variant-flat) {
  border: 2px solid transparent;
}

/* --- FABの配置 (出席管理画面と同じ) --- */
/*
.fab-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  z-index: 100;
}
*/
</style>