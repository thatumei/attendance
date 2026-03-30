<template>
  <v-container fluid class="pa-0 bg-white fill-height d-flex flex-column overflow-hidden">
    
    <header class="flex-grow-0 pa-4 pb-2 border-b">
      <v-row align="center" no-gutters>
        <v-col cols="auto" class="mr-4">
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
        <v-col>
          <h1 class="page-title">{{ classId }}年生（{{ schoolName }}）</h1>
        </v-col>
      </v-row>
    </header>

    <div class="flex-grow-1 d-flex min-height-0">
      
      <section class="staff-section pa-4 border-e d-flex flex-column">
        <h2 class="section-title mb-4">指導員</h2>
        
        <div class="instructor-grid flex-grow-1 mb-4">
          <div v-for="n in 4" :key="n" class="instructor-slot d-flex align-center justify-center">
            <v-icon size="x-large" color="grey-lighten-3">mdi-account-outline</v-icon>
          </div>
        </div>

        <v-btn
          color="grey-darken-3"
          variant="outlined"
          rounded="pill"
          block
          height="60"
          class="text-h6 font-weight-bold border-bold"
        >
          木札
        </v-btn>
      </section>

      <section class="log-section pa-4 flex-grow-1 d-flex flex-column bg-grey-lighten-5">
        <h2 class="section-title mb-4">入場ログ</h2>
        
        <div class="table-wrapper rounded-xl border">
          <v-table fixed-header class="custom-table">
            <thead>
              <tr>
                <th class="text-left font-weight-bold bg-grey-lighten-4" style="width: 30%">ID</th>
                <th class="text-left font-weight-bold bg-grey-lighten-4" style="width: 50%">名前</th>
                <th class="text-center font-weight-bold bg-grey-lighten-4" style="width: 20%">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in logs" :key="log.id">
                <td class="text-h6 font-weight-medium">{{ log.id }}</td>
                <td class="text-h6 font-weight-bold">{{ log.name }}</td>
                <td class="text-center">
                  <v-btn icon="mdi-dots-horizontal" variant="text" color="grey-darken-1"></v-btn>
                </td>
              </tr>
              <tr v-for="i in Math.max(0, 10 - logs.length)" :key="'empty-'+i">
                <td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </section>
    </div>

    <div class="fab-container">
      <v-btn
        color="primary"
        icon="mdi-view-grid"
        size="large"
        elevation="4"
        class="mb-4"
        @click="router.push(`/class/${schoolId}/${classId}`)"
      >
        <v-tooltip activator="parent" location="left">表へ</v-tooltip>
      </v-btn>
      <v-btn
        color="grey-darken-3"
        icon="mdi-qrcode-scan"
        size="large"
        elevation="4"
        @click="router.push(`/scan/${schoolId}/${classId}`)"
      >
        <v-tooltip activator="parent" location="left">QRへ</v-tooltip>
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { schoolId, classId } = route.params
const schoolNames = { s: '産文', h: '保見', c: '地文', m: '緑ヶ丘' }
const schoolName = schoolNames[schoolId] || schoolId

// サンプルデータ
const logs = ref([
  { id: '0005005', name: '発明 太郎' },
  { id: '0005006', name: '発明 花子' }
])
</script>

<style scoped>
.page-title {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 900;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: #424242;
}

/* 指導員エリアの設定 */
.staff-section {
  width: 320px;
}

.instructor-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
}

.instructor-slot {
  background-color: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
}

/* テーブルエリアの設定 */
.table-wrapper {
  flex-grow: 1;
  background-color: #fff;
  overflow: hidden; /* 角丸を効かせる */
}

.custom-table {
  height: 100%;
}

.custom-table th {
  font-size: 1.1rem !important;
  height: 60px !important;
}

.custom-table td {
  height: 70px !important;
  border-bottom: 1px solid #eee !important;
}

/* 共通設定 */
.border-bold {
  border-width: 2px !important;
}

.fab-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.min-height-0 {
  min-height: 0;
}
</style>