import MProgressCircle from './circle'
import { VueConstructor } from 'vue'
MProgressCircle.install = function install(Vue: VueConstructor) {
  Vue.component(MProgressCircle.name, MProgressCircle)
}

export {
  MProgressCircle,
}
