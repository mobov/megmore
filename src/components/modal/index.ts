import Modal from './modal'
import { VueConstructor } from 'vue'
Modal.install = function install(Vue: VueConstructor): void {
 Vue.component(Modal.name, Modal)
}
export default Modal
