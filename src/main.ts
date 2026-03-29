// Plugins
import { registerPlugins } from '@/plugins'
import router from './router' // 追加

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App).use(router) // 追加

registerPlugins(app)

app.mount('#app')
