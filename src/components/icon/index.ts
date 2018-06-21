import MIcon from './icon'
import { VueConstructor } from 'vue'

/* istanbul ignore next */
MIcon.install = function install(Vue: VueConstructor) {
  Vue.component(MIcon.name, MIcon)
}

export default MIcon
