import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../../src/styles/style.scss'
import Megalo from '../../src/index'
Vue.use(Megalo)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
