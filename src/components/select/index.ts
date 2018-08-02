

import MSelect from '@/components/select/select'
import { VueConstructor } from 'vue'
MSelect.install = function install(Vue: VueConstructor): void {
 Vue.component(MSelect.name, MSelect)
}
export default MSelect
