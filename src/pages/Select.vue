<template>
  <v-container class="py-8">
    <h1 class="text-h4 mb-6 font-weight-bold">教室・クラスの選択</h1>

    <v-card variant="outlined" class="rounded-lg">
      <v-tabs v-model="activeTab" bg-color="grey-lighten-4" color="primary" grow>
        <v-tab v-for="location in Object.keys(allClassData)" :key="location" :value="location">
          {{ location }}
        </v-tab>
      </v-tabs>

      <v-divider></v-divider>

      <v-list class="pa-0">
        <v-list-item v-for="item in currentClasses" :key="item.name" class="py-4 border-b">
          <v-row align="center" no-gutters>
            <v-col cols="12" sm="8" class="d-flex align-center">
              <v-icon icon="mdi-circle-outline" start size="small"></v-icon>
              <div class="text-h6 ml-2">
                {{ item.name }}
                <span class="ml-4 text-grey-darken-1 text-body-1">
                  （生徒数：{{ item.students }}人）
                </span>
              </div>
            </v-col>

            <v-col cols="12" sm="4" class="text-right">
              <v-btn variant="outlined" rounded="xl" class="px-8 border-md font-weight-bold" size="large"
                @click="goToRostar(item.name)">
                開始 >>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('産文')

// 各教室のクラスデータ定義（「0」は廃止）
const allClassData = {
  '産文': [
    { name: '1年生', students: 10 },
    { name: '2年生', students: 20 },
    { name: '3年生', students: 15 },
    { name: '4年生', students: 21 },
    { name: '5年生', students: 25 },
    { name: '6年生', students: 20 },
    { name: 'AD1', students: 12 },
    { name: 'AD2', students: 8 },
    { name: 'AD3', students: 10 },
    { name: 'OM', students: 5 },
  ],
  '保見': [
    { name: '1年生', students: 10 }, { name: '2年生', students: 12 },
    { name: '3年生', students: 14 }, { name: '4年生', students: 11 },
    { name: '5年生', students: 16 }, { name: '6年生', students: 13 },
  ],
  '地文': [
    { name: '1年生', students: 8 }, { name: '2年生', students: 15 },
    { name: '3年生', students: 12 }, { name: '4年生', students: 10 },
    { name: '5年生', students: 14 }, { name: '6年生', students: 18 },
  ],
  '緑ヶ丘': [
    { name: '1年生', students: 12 }, { name: '2年生', students: 10 },
    { name: '3年生', students: 11 }, { name: '4年生', students: 9 },
    { name: '5年生', students: 15 }, { name: '6年生', students: 12 },
  ]
}

// 選択中のタブに応じたクラス一覧を取得
const currentClasses = computed(() => {
  return allClassData[activeTab.value] || []
})

// /rostar への遷移処理
const goToRostar = (className) => {
  router.push({
    path: '/rostar',
    query: {
      location: activeTab.value,
      class: className
    }
  })
}
</script>

<style scoped>
.v-btn {
  border-width: 2px !important;
}

.border-b {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}

.v-list-item:last-child {
  border-bottom: none !important;
}
</style>
