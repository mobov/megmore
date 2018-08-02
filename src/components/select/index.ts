

import MSelect from '@/components/select/select'
import MOption from '@/components/select/opion'
import { VueConstructor } from 'vue'
MSelect.install = function install(Vue: VueConstructor): void {
 Vue.component(MSelect.name, MSelect)
}
MOption.install = function install(Vue: VueConstructor): void {
  Vue.component(MOption.name, MOption)
 }
export {
  MSelect,
  MOption,
}
