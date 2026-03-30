<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" lg="10">
        <div class="d-flex align-center mb-8">
          <v-icon icon="mdi-school" size="x-large" color="primary" class="mr-3"></v-icon>
          <h1 class="text-h4 font-weight-black text-grey-darken-3">教室・クラスの選択</h1>
        </div>

        <v-card variant="flat" border class="mb-6 rounded-xl">
          <v-tabs
            v-model="activeTab"
            bg-color="grey-lighten-4"
            color="primary"
            grow
            selected-class="font-weight-bold"
          >
            <v-tab
              v-for="room in config.classrooms"
              :key="room.name"
              :value="room.name"
              class="text-body-1"
            >
              {{ room.name }}
            </v-tab>
          </v-tabs>

          <v-window v-model="activeTab">
            <v-window-item v-for="room in config.classrooms" :key="room.name" :value="room.name">
              <v-table hover class="class-table">
                <thead>
                  <tr class="bg-grey-lighten-5">
                    <th class="text-left font-weight-bold">クラス名</th>
                    <th class="text-center font-weight-bold">生徒数</th>
                    <th class="text-right font-weight-bold" style="width: 200px;">アクション</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in room.classes" :key="item.name">
                    <td>
                      <span class="text-h6">{{ item.name }}</span>
                    </td>
                    <td class="text-center">
                      <v-chip variant="flat" color="grey-lighten-2" size="small" class="font-weight-bold">
                        {{ item.count }} 名
                      </v-chip>
                    </td>
                    <td class="text-right">
                      <v-btn
                        color="primary"
                        variant="flat"
                        rounded="pill"
                        class="px-6 font-weight-bold"
                        @click="startClass(room.name, item.name)"
                      >
                        開始 >>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-window-item>
          </v-window>
        </v-card>

        <div class="text-right text-caption text-grey">
          最終更新: 2026/03/30
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import config from '@/data/config/classes.yaml'

const router = useRouter()
const activeTab = ref(config.classrooms[0].name)
const selectedClassName = ref(null)

// 教室名とIDのマッピング (s, h, c, m)
const schoolIdMap = {
  '産文': 's',
  '保見': 'h',
  '地文': 'c',
  '緑ヶ丘': 'm'
}

const startClass = (roomName, className) => {
  const sId = schoolIdMap[roomName]
  // クラス名から数字（学年）のみを抽出、ADなどはそのまま使用
  const cId = className.replace('年生', '')
  
  // URL: /class/s/1 などの形式で遷移
  router.push(`/class/${sId}/${cId}`)
}
</script>

<style scoped>
.class-table {
  border-top: none;
}

/* 行のホバー時の色を調整 */
:deep(.v-table__wrapper tr:hover) {
  background-color: #F5F5F5 !important;
}

/* ラジオボタンの中央揃え微調整 */
:deep(.v-selection-control) {
  justify-content: center;
}

/* テーブルのフォントサイズ調整 */
.v-table th {
  font-size: 0.9rem !important;
  color: #616161 !important;
}
</style>