import Vue from 'vue'
import App from './App.vue'
import '../../src/styles/style.scss'
import Megalo from '../../src/index'
Vue.use(Megalo)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app')
