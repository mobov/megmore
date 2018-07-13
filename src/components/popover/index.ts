import MPopover from './popover'
import { VueConstructor } from 'vue';
MPopover.install = function install(Vue: VueConstructor) {
 Vue.component(MPopover.name, MPopover)
}

export default MPopover
