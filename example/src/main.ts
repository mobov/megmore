import Vue from 'vue'
import App from './App.vue'
import '../../src/styles/style.scss'
import Megmore from '../../src/index'
Vue.use(Megmore)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
