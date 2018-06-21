import MAppBar from './appBar.vue'
import { VueConstructor } from 'vue'

/* istanbul ignore next */
MAppBar.install = function install(Vue: VueConstructor) {
  Vue.component(MAppBar.name, MAppBar)
}

export default MAppBar
