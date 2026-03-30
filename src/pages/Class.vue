<template>
  <v-container fluid class="pa-0 bg-white fill-height d-flex flex-column overflow-hidden">
    
    <div class="flex-grow-0 pa-4 pb-2">
      <v-row align="center" no-gutters>
        <v-col cols="auto" class="mr-4">
          <v-btn
            variant="flat"
            color="grey-darken-3"
            rounded="pill"
            class="px-6"
            @click="router.push('/select')"
          >
            戻る >>
          </v-btn>
        </v-col>
        <v-col>
          <h1 class="responsive-title font-weight-black text-grey-darken-3">
            {{ schoolName }} {{ classId }}年生
            <span class="text-h6 ml-2 text-grey">
              ({{ stats.present }} / {{ stats.total }})
            </span>
          </h1>
        </v-col>
      </v-row>
    </div>

    <div class="grid-wrapper flex-grow-1">
      <div class="attendance-grid">
        <div
          v-for="(member, index) in displayMembers"
          :key="index"
          class="member-card"
          :class="{ 'is-present': member?.isPresent }"
          @click="member && goToVerify(member.id)"
        >
          <template v-if="member">
            <div class="card-inner pa-2 d-flex flex-column justify-space-between fill-height">
              <div class="d-flex justify-space-between align-start">
                <span class="text-caption font-weight-bold">{{ index + 1 }}</span>
                <span class="id-text text-grey d-none d-md-inline">{{ member.id }}</span>
              </div>
              
              <div class="name-section d-flex flex-column align-center justify-center">
                <div class="kana-text text-grey-darken-1 text-truncate w-100 text-center">{{ member.kana }}</div>
                <div class="name-text font-weight-black text-center">{{ member.name }}</div>
              </div>

              <div class="text-center">
                <v-icon 
                  :size="isMobile ? 'small' : 'default'"
                  :color="member.isPresent ? 'success' : 'grey-lighten-4'" 
                  :icon="member.isPresent ? 'mdi-check-circle' : 'mdi-circle-outline'"
                ></v-icon>
              </div>
            </div>
          </template>
          <div v-else class="empty-slot"></div>
        </div>
      </div>
    </div>

    <div class="fab-container">
      <v-btn color="primary" icon="mdi-account-star" elevation="4" class="mb-4" @click="handleStaff"></v-btn>
      <v-btn color="grey-darken-3" icon="mdi-qrcode" elevation="4" @click="handleQR"></v-btn>
    </div>

    <v-overlay :model-value="loading" class="align-center justify-center" persistent>
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const route = useRoute()
const router = useRouter()
const { xs } = useDisplay()

const loading = ref(true)
const rawMembers = ref([])
const isMobile = computed(() => xs.value)

const s = route.params.schoolId || 's'
const classId = route.params.classId || '1'
const schoolNames = { s: '産文', h: '保見', c: '地文', m: '緑ヶ丘' }
const schoolName = schoolNames[s] || s

onMounted(async () => {
  try {
    const classModule = await import(`../data/class/${s}-${classId}.yaml`)
    const idList = classModule.default.ids
    const memberPromises = idList.map(async (id) => {
      try {
        const mModule = await import(`../data/member/${id}.yaml`)
        return { ...mModule.default, isPresent: false }
      } catch (e) {
        return { id, name: '未登録', kana: '-', isPresent: false }
      }
    })
    rawMembers.value = await Promise.all(memberPromises)
  } catch (e) { console.error(e) } finally { loading.value = false }
})

const displayMembers = computed(() => {
  const list = [...rawMembers.value]
  // 横10列に対して、縦5行分（50枠）を最低保証。それ以上は10刻み。
  const targetSize = Math.max(50, Math.ceil(list.length / 10) * 10)
  while (list.length < targetSize) { list.push(null) }
  return list
})

const stats = computed(() => ({
  present: rawMembers.value.filter(m => m.isPresent).length,
  total: rawMembers.value.length
}))

const goToVerify = (id) => router.push(`/verify/${s}/${classId}/${id}`)
</script>

<style scoped>
/* コンテナ全体の設定 */
.overflow-hidden { overflow: hidden; }

.responsive-title {
  font-size: clamp(1.2rem, 3vw, 2.2rem);
  line-height: 1;
}

/* グリッドをラップする領域を画面一杯に広げる */
.grid-wrapper {
  position: relative;
  width: 100%;
  min-height: 0; /* Flexbox内での高さ計算バグ防止 */
}

.attendance-grid {
  display: grid;
  height: 100%; /* 親要素の高さに合わせる */
  width: 100%;
  grid-template-columns: repeat(10, 1fr);
  /* 縦の行数に関わらず、利用可能な高さを等分する */
  grid-auto-rows: 1fr; 
  gap: 1px;
  background-color: #e0e0e0;
  border-top: 1px solid #e0e0e0;
}

.member-card {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s;
  cursor: pointer;
}

.is-present { background-color: #FFFDE7 !important; }
.empty-slot { background-color: #fafafa; }

/* 名前とテキストのサイズ調整 */
.name-section {
  flex-grow: 1;
  min-height: 0;
}

.name-text {
  font-size: clamp(0.75rem, 2vw, 1.4rem);
  line-height: 1.1;
  word-break: break-all;
}

.kana-text {
  font-size: clamp(0.5rem, 1vw, 0.85rem);
}

.id-text { font-size: 0.7rem; }

/* FAB位置 */
.fab-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  z-index: 100;
}
</style>