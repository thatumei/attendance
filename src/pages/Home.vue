<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4" class="text-center">
        
        <h2 class="text-h5 mb-6">PINコードを入力</h2>

        <div class="d-flex justify-center mb-6">
          <v-otp-input
            v-model="pin"
            length="4"
            type="number"
            variant="outlined"
            @finish="handleLogin"
          ></v-otp-input>
        </div>

        <v-btn
          color="primary"
          rounded="pill"
          size="x-large"
          min-width="200"
          @click="handleLogin"
        >
          ログイン >>
        </v-btn>

      </v-col>
    </v-row>

    <v-snackbar
      v-model="showError"
      color="error"
      timeout="3000"
      location="bottom"
    >
      PINコードが正しくありません。
      <template v-slot:actions>
        <v-btn variant="text" @click="showError = false">閉じる</v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="showSuccess"
      color="success"
      timeout="3000"
      location="bottom"
    >
      ログイン成功！
      <template v-slot:actions>
        <v-btn variant="text" @click="showSuccess = false">閉じる</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'

const pin = ref('')
const showError = ref(false)
const showSuccess = ref(false)
const CORRECT_PIN = '1188'

const handleLogin = () => {
  if (pin.value === CORRECT_PIN) {
    showSuccess.value = true
    router.push('/select')
    // ここに遷移処理などを記述
  } else {
    showError.value = true
    pin.value = '' // 入力をリセット
    pin.error = true // エラー表示を有効化
  }
}
</script>

<style scoped>
/* 必要に応じて微調整 */
.v-otp-input {
  max-width: 300px;
}
</style>