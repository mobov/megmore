import MTooltip from './tooltip'
import { VueConstructor } from 'vue'
MTooltip.install = function install(Vue: VueConstructor) {
  Vue.component(MTooltip.name, MTooltip)
}

export default MTooltip
