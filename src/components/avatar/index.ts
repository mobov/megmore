import MAvatar from './avatar'
import { VueConstructor } from 'vue'

/* istanbul ignore next */
MAvatar.install = function install(Vue: VueConstructor) {
  Vue.component(MAvatar.name, MAvatar)
}

export default MAvatar
