import Ripple from '@/directives/ripple'
import ClickOutside from '@/directives/click-outside'
import { VueConstructor } from 'vue'

export {
  Ripple,
  ClickOutside,
}

export default function install(Vue: VueConstructor) {
  Vue.directive(Ripple.name, Ripple)
  Vue.directive(ClickOutside.name, ClickOutside)
}
