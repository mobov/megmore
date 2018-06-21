import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../../src/styles/style.scss'
import Megmore from '../../src/index'
import icons from '../../src/styles/icons/selection.json'

console.log(icons.icons)
Vue.use(Megmore)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
