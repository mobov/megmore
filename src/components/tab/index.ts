import MTab from './tab'
import MTabItem from './tab-item'
import { VueConstructor } from 'vue'
MTab.install = function install(Vue: VueConstructor) {
  Vue.component(MTab.name, MTab)
  Vue.component(MTabItem.name, MTabItem)
}

export {
  MTab,
  MTabItem,
}
