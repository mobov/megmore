import Button from './button'
import {VueConstructor} from 'vue'
Button.install = function install(Vue: VueConstructor) {
 Vue.component(Button.name, Button)
}
export default Button
