/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App
 */

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Styles
import 'unfonts.css'

const app = createApp(App)

// plugins/index.ts 内で router が登録されるようにします
registerPlugins(app)

app.mount('#app')