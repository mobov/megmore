import { MIcon, setIcons} from './icon'
import { VueConstructor } from 'vue'

/* istanbul ignore next */
MIcon.install = function install(Vue: VueConstructor) {
  Vue.component(MIcon.name, MIcon)
}
MIcon.register = function register(data: any = {}) {
    setIcons(data)
}

export default MIcon
