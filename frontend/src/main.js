import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
