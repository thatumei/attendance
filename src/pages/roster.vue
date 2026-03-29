<template>
    <v-container fluid class="pa-0 fill-height">
        <v-row no-gutters class="fill-height">
            <v-col cols="9" class="pa-6 border-e">
                <div class="d-flex align-center mb-6">
                    <v-btn variant="outlined" rounded="xl" class="px-6 mr-4 border-md" @click="router.back()">
                        << 戻る </v-btn>
                            <h2 class="text-h4 font-weight-bold">
                                {{ selectedClass }}（{{ selectedLocation }}）
                            </h2>
                </div>

                <v-row no-gutters class="roster-grid">
                    <v-col v-for="student in students" :key="student.id" cols="12" sm="1"
                        class="grid-item border d-flex flex-column align-center justify-center"
                        style="flex: 0 0 12.5%; max-width: 12.5%; aspect-ratio: 1 / 1;">
                        <div class="text-caption text-grey">{{ student.id }}</div>
                        <div class="text-subtitle-1 font-weight-bold">{{ student.name }}</div>
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols="3" class="pa-6 d-flex flex-column align-center">
                <v-avatar size="150" color="grey-lighten-4" class="mb-8 border-md">
                    <div class="text-h6">Clock</div>
                </v-avatar>

                <div class="text-h5 mb-8 w-100 px-4">
                    <div class="d-flex justify-space-between mb-2">
                        <span>○</span> <span>20 人</span>
                    </div>
                    <div class="d-flex justify-space-between mb-2">
                        <span>×</span> <span>32 人</span>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="d-flex justify-space-between font-weight-bold">
                        <span>全</span> <span>52 人</span>
                    </div>
                </div>

                <v-btn block variant="outlined" rounded="xl" size="x-large" class="mb-4 border-md text-h6"
                    @click="router.push('/admin')">
                    担当 >>
                </v-btn>
                <v-btn block variant="outlined" rounded="xl" size="x-large" class="border-md text-h6"
                    @click="router.push('/qr')">
                    QR >>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 前の画面から引き継いだ情報（デフォルト値設定）
const selectedLocation = ref(route.query.location || '産文')
const selectedClass = ref(route.query.class || '1年生')

// 生徒データ（実際はAPIやfs等で取得する想定）
const students = ref([])

onMounted(async () => {
    // 本来はここで fetch(`/api/data/sanbun/1`) などを呼び出す
    // 今回はダミーデータで32人分（8x4）生成
    students.value = Array.from({ length: 32 }, (_, i) => ({
        id: i + 1,
        name: `生徒${i + 1}`, // 本来はyaml内の「名前」
        furigana: `せいと${i + 1}`
    }))
})
</script>

<style scoped>
.border-md {
    border-width: 2px !important;
}

.roster-grid {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    border-left: 1px solid rgba(0, 0, 0, 0.12);
}

.grid-item {
    border-right: 1px solid rgba(0, 0, 0, 0.12) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
    background-color: #fff;
}

.grid-item:hover {
    background-color: #f5f5f5;
    cursor: pointer;
}
</style>
