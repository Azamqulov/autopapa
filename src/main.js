
import '@/assets/css/index.css'
import '../public/config'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//  import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
// import VueLazyload from 'vue3-lazyload'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
})
app.use(Toast)
app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
