import Vue from 'vue'
import App from './App.vue'
import router from './router'


import { MIcon_menu } from '../../src/icons/index'
import Megmore from '../../src/index'

console.log(MIcon_menu)
Vue.use(Megmore, {
  theme: 'unicon',
  icons: {
      MIcon_menu,
  },
})

Vue.config.productionTip = false

new Vue({
  router,
  render: (h: any) => h(App),
}).$mount('#app')
