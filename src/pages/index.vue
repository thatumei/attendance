<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card variant="flat" class="pa-8 text-center" max-width="400">
      <h2 class="text-h5 mb-6">PINコードを入力</h2>
      
      <v-otp-input
        v-model="otp"
        :length="4"
        :error="isError"
        class="mb-2"
        @finish="handleLogin"
      ></v-otp-input>

      <div class="text-error text-caption mb-4" style="height: 20px;">
        {{ isError ? 'PINコードが正しくありません' : '' }}
      </div>

      <v-btn
        color="primary"
        size="large"
        rounded="pill"
        block
        :disabled="otp.length < 4"
        append-icon="mdi-chevron-right"
        @click="handleLogin"
      >
        ログイン
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const otp = ref('')
const isError = ref(false)

// 入力を始めたらエラー表示を消す
watch(otp, () => {
  if (isError.value) isError.value = false
})

const handleLogin = () => {
  if (otp.value === '1188') {
    router.push('/select')
  } else {
    isError.value = true
    otp.value = '' // 失敗時にリセット
  }
}
</script>

<style scoped>
.v-otp-input {
  max-width: 300px;
  margin: 0 auto;
}
.text-error {
  color: rgb(var(--v-theme-error));
}
</style>