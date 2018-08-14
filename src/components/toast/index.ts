import MToast from './toast'
import { VueConstructor } from 'vue'
MToast.install = function install(Vue: VueConstructor) {
    Vue.component(MToast.name, MToast)
}

export default MToast
