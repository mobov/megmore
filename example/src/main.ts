import Vue from 'vue'
import App from './App.vue'
import router from './router'


import { MIcon_ac_unit, MIcon_menu } from '../../src/icons/index'
import Megmore from '../../src/index'
Vue.use(Megmore, {
  theme: 'unicon',
  icons: {
      MIcon_ac_unit,
      MIcon_menu,
  },
})
console.log(Megmore)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h: any) => h(App),
}).$mount('#app')
