import MAppBar from './appBar'
import { VueConstructor } from 'vue'

/* istanbul ignore next */
MAppBar.install = function install(Vue: VueConstructor) {
  Vue.component(MAppBar.name, MAppBar)
}

export default MAppBar
