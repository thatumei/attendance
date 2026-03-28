/**
 * plugins/index.ts
 *
 * Includes plugins the app directly uses.
 */

// Plugins
import vuetify from './vuetify'
import router from '../router' // router をインポート

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router) // ここで router を登録
}