import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'


import 'floating-vue/dist/style.css'
import "vue-toastification/dist/index.css";

const app = createApp(App)
app.config.unwrapInjectedRef = true
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast)
app.use(FloatingVue)


app.mount('#app')
