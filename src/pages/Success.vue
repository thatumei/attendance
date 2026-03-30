<template>
  <v-container fluid class="fill-height bg-white d-flex align-center justify-center overflow-hidden">
    <v-card variant="flat" width="100%" max-width="900" class="text-center bg-transparent">
      
      <main>
        <h1 class="success-title mb-10">成 功</h1>

        <div class="icon-wrapper mb-10">
          <v-icon
            icon="mdi-check-circle-outline"
            color="success"
            class="huge-icon"
          ></v-icon>
        </div>

        <h2 class="welcome-message mb-16">
          ようこそ <span class="user-name">{{ member?.name || '発明 太郎' }}</span> さん
        </h2>

        <nav class="button-area">
          <v-btn
            variant="outlined"
            color="black"
            rounded="pill"
            min-width="250"
            height="80"
            class="text-h4 font-weight-bold border-bold"
            @click="goBack"
          >
            <v-icon icon="mdi-arrow-left" class="mr-2"></v-icon>
            戻る
          </v-btn>
        </nav>
      </main>

    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const member = ref(null)

const { schoolId, classId, memberId } = route.params

onMounted(async () => {
  // 必要に応じて、ここでメンバー名を取得
  // (前の画面から state で渡すか、再度読み込む)
  try {
    if (memberId) {
      const mModule = await import(`../data/member/${memberId}.yaml`)
      member.value = mModule.default
    }
  } catch (e) {
    console.error(e)
  }
})

const goBack = () => {
  // 指定された教室・クラスの一覧画面に戻る
  router.push(`/class/${schoolId}/${classId}`)
}
</script>

<style scoped>
/* H1: 「成功」を画面中央で最も目立たせる */
.success-title {
  font-size: clamp(4rem, 15vw, 8rem);
  font-weight: 900;
  letter-spacing: 0.5rem;
  color: #333;
}

/* 巨大なチェックマーク */
.huge-icon {
  font-size: clamp(8rem, 25vw, 15rem) !important;
}

/* H2: 歓迎文 */
.welcome-message {
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: #444;
}

/* 名前部分をさらに強調 */
.user-name {
  color: #000;
  border-bottom: 4px solid #4CAF50; /* 緑のアンダーライン */
  padding-bottom: 4px;
}

/* ボタンの枠線を太く */
.border-bold {
  border-width: 3px !important;
}

/* ボタン内のテキスト調整 */
:deep(.v-btn__content) {
  font-size: 2.2rem !important;
}

/* 画面のバウンドを防ぐ */
.overflow-hidden {
  overflow: hidden;
}
</style>