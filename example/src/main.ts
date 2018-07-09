import Vue from 'vue'
import App from './App.vue'
import router from './router'


import { MIcon_more_vert, MIcon_account_circle } from '../../src/icons/index'
import Megmore from '../../src/index'

Vue.use(Megmore, {
  theme: 'unicon',
  icons: {
    MIcon_more_vert,
    MIcon_account_circle,
  },
})

Vue.config.productionTip = false
Vue.mixin({
  methods: {
    log(...args) {
      console.log(...args)
    },
  },
})
new Vue({
  router,
  render: (h: any) => h(App),
}).$mount('#app')
