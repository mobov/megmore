
import Resize from './resize'
import Ripple from './ripple'

export {
  Ripple,
  Resize,
}

export default function install (Vue) {
  Vue.directive('ripple', Ripple)
  Vue.directive('resize', Resize)
}
