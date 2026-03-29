<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4" class="text-center">
        <h2 class="text-h5 mb-6 text-grey-darken-2">PINコードを入力</h2>

        <v-otp-input v-model="pin" length="4" variant="outlined" class="mb-8" :error="error"></v-otp-input>

        <v-btn color="black" variant="outlined" rounded="xl" size="x-large" class="px-12 text-none border-md"
          @click="handleLogin">
          ログイン >>
        </v-btn>

        <p v-if="error" class="text-error mt-4">PINコードが正しくありません</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pin = ref('')
const error = ref(false)

const handleLogin = () => {
  // 認証チェック
  if (pin.value === '1188') {
    error.value = false
    // /select ページへ移動
    router.push('/select')
  } else {
    error.value = true
    pin.value = '' // 失敗時にクリア
  }
}
</script>

<style scoped>
.v-btn {
  border-width: 2px !important;
}
</style>
