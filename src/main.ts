import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueReCaptcha } from 'vue-recaptcha-v3'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueReCaptcha, {
  siteKey: '6LcthpErAAAAAMC7V3Dn9hJsfZTlRRxpTmSTlvEq',
  loaderOptions: {
    autoHideBadge: true,
  },
})

app.mount('#app')
