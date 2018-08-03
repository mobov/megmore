import MTextField from './input'
import { VueConstructor } from 'vue'
MTextField.install = function install(Vue: VueConstructor) {
  Vue.component(MTextField.name, MTextField)
}

export default MTextField
