import Modal from './modal'
import {VueConstructor} from 'vue'
Modal.install = function install(Vue: VueConstructor) {
 Vue.component(Modal.name, Modal)
}
export default Modal
