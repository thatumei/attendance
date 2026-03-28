<template>
  <v-sheet elevation="2" class="ma-4">
    <v-tabs v-model="tab" color="primary" grow>
      <v-tab value="sanbun">産文</v-tab>
      <v-tab value="homi">保見</v-tab>
      <v-tab value="chibun">地文</v-tab>
      <v-tab value="midori">緑ヶ丘</v-tab>
    </v-tabs>

    <v-divider></v-divider>

    <v-tabs-window v-model="tab">
      
      <v-tabs-window-item value="sanbun">
        <v-sheet class="pa-5">産文のクラス一覧</v-sheet>
      </v-tabs-window-item>

      <v-tabs-window-item value="homi">
        <v-sheet class="pa-5">保見のクラス一覧</v-sheet>
      </v-tabs-window-item>

      <v-tabs-window-item value="chibun">
        <v-sheet class="pa-5">地文のクラス一覧</v-sheet>
      </v-tabs-window-item>

      <v-tabs-window-item value="midori">
        <v-list lines="two">
          <v-list-item>
            <template v-slot:prepend>
              <v-avatar color="green-lighten-4" text="1"></v-avatar>
            </template>
            <v-list-item-title class="font-weight-bold">１年生</v-list-item-title>
            <v-list-item-subtitle>生徒数：10人</v-list-item-subtitle>
            
            <template v-slot:append>
              <v-btn
                color="green"
                variant="flat"
                rounded="pill"
                size="small"
                append-icon="mdi-chevron-right"
              >
                開始
              </v-btn>
            </template>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <template v-slot:prepend>
              <v-avatar color="green-lighten-4" text="2"></v-avatar>
            </template>
            <v-list-item-title class="font-weight-bold">２年生</v-list-item-title>
            <v-list-item-subtitle>生徒数：15人</v-list-item-subtitle>
            
            <template v-slot:append>
              <v-btn
                color="green"
                variant="flat"
                rounded="pill"
                size="small"
                append-icon="mdi-chevron-right"
              >
                開始
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-tabs-window-item>
      
    </v-tabs-window>
  </v-sheet>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const tab = ref('midori') // 初期値を緑ヶ丘に設定
</script>