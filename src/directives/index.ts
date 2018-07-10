import Ripple from '@/directives/ripple'
import { VueConstructor } from 'vue';

export {
  Ripple,
}

export default function install(Vue: VueConstructor) {
  Vue.directive(Ripple.name, Ripple)
}
