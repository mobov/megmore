import MProgressCircle from './circle'
import MProgressLinear from './linear'
import { VueConstructor } from 'vue'
MProgressCircle.install = function install(Vue: VueConstructor) {
  Vue.component(MProgressCircle.name, MProgressCircle)
}
MProgressLinear.install = function install(Vue: VueConstructor) {
  Vue.component(MProgressLinear.name, MProgressLinear)
}
export {
  MProgressCircle,
  MProgressLinear,
}
