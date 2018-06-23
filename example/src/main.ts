import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import '../../src/icons/ac_unit'
// import '../../src/icons/archive'
import { MIcon_ac_unit } from '../../src/icons/index'
import Megmore from '../../src/index'
Vue.use(Megmore,{
  theme: 'unicon',
  icons: {
      MIcon_ac_unit
  }
})
console.log(Megmore)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
