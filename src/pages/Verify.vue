<template>
  <v-container fluid class="fill-height bg-grey-lighten-4 d-flex align-center justify-center">
    <v-card variant="flat" width="100%" max-width="900" class="bg-transparent text-center">
      
      <header class="text-left px-4 mb-8">
        <h1 class="page-title">本人確認</h1>
      </header>

      <main>
        <section class="confirm-section">
          <h2 class="guide-text mb-6">あなたの名前は</h2>

          <div v-if="member" class="name-card py-12 mb-8">
            <p class="kana-display mb-2">{{ member.kana }}</p>
            <h3 class="name-display">{{ member.name }}</h3>
          </div>

          <h2 class="guide-text mb-12">ですか？</h2>
        </section>

        <nav class="button-area">
          <v-row justify="center" no-gutters class="gap-16">
            <v-col cols="5">
              <v-btn
                color="error"
                variant="flat"
                rounded="pill"
                block
                height="100"
                class="text-h4 font-weight-bold"
                @click="router.back()"
              >
                いいえ
              </v-btn>
            </v-col>
            
            <v-col cols="5">
              <v-btn
                color="primary"
                variant="flat"
                rounded="pill"
                block
                height="100"
                class="text-h4 font-weight-bold"
                @click="handleConfirm"
              >
                はい
              </v-btn>
            </v-col>
          </v-row>
        </nav>
      </main>
    </v-card>

    <v-overlay :model-value="loading" class="align-center justify-center" persistent>
      <v-progress-circular indeterminate size="80" color="primary"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const member = ref(null)

const { schoolId, classId, memberId } = route.params

onMounted(async () => {
  try {
    const mModule = await import(`../data/member/${memberId}.yaml`)
    member.value = mModule.default
  } catch (e) {
    router.back()
  } finally {
    loading.value = false
  }
})

const handleConfirm = () => {
  router.push(`/success/${schoolId}/${classId}/${memberId}`)
}
</script>

<style scoped>
/* H1: ページタイトル */
.page-title {
  font-size: 2.5rem;
  font-weight: 900;
  color: #424242;
}

/* H2: 案内文 */
.guide-text {
  font-size: 2rem;
  font-weight: 700;
  color: #616161;
}

/* 名前表示エリアのカード */
.name-card {
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
}

/* フリガナ */
.kana-display {
  font-size: 1.5rem;
  color: #757575;
  letter-spacing: 0.3rem;
}

/* H3: 本人の名前（画面内で最も強調） */
.name-display {
  font-size: clamp(3.5rem, 12vw, 7rem);
  font-weight: 900;
  line-height: 1.1;
  color: #000;
}

/* レイアウト調整 */
.gap-16 {
  gap: 24px;
}

.button-area {
  max-width: 800px;
  margin: 0 auto;
}

/* ボタン内のテキストも大きく */
:deep(.v-btn__content) {
  font-size: 2rem !important;
}
</style>