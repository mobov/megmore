
import Resize from './resize'
import Ripple from './ripple'
import { VueConstructor } from 'vue';

export {
  Ripple,
  Resize,
}

export default function install(Vue: VueConstructor) {
  Vue.directive('ripple', Ripple)
  Vue.directive('resize', Resize)
}
