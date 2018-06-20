import MAvatar from './avatar.vue'
import { VueConstructor } from 'vue'

/* istanbul ignore next */
MAvatar.install = function install(Vue: VueConstructor) {
  Vue.component(MAvatar.name, MAvatar)
}

export default MAvatar
