import MTab from './tab'
import MTabItem from './tab-item'
import MTabContent from './tab-content'
import { VueConstructor } from 'vue'
MTab.install = function install(Vue: VueConstructor) {
  Vue.component(MTab.name, MTab)
}
MTabContent.install = function install(Vue: VueConstructor) {
  Vue.component(MTabContent.name, MTabContent)
}
MTabItem.install = function install(Vue: VueConstructor) {
  Vue.component(MTabItem.name, MTabItem)
}
export {
  MTab,
  MTabItem,
  MTabContent,
}
