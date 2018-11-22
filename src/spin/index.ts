import MSpin from './spin'
import { VueConstructor } from 'vue'

MSpin.install = function install(Vue: VueConstructor): void {
 Vue.component(MSpin.name, MSpin)
}

export default MSpin
