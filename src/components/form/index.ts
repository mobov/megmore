import MForm from './form'
import MFormItem from './form-item'
import { VueConstructor } from 'vue'
MForm.install = function install(Vue: VueConstructor) {
 Vue.component(MForm.name, MForm)
}
MFormItem.install = function install(Vue: VueConstructor) {
 Vue.component(MFormItem.name, MFormItem)
}
export {
 MForm,
 MFormItem,
}