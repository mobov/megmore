import { MIcon, setIcons } from './icon'

/* istanbul ignore next */
MIcon.install = function install(Vue: any): void {
  Vue.component(MIcon.name, MIcon)
}
MIcon.register = function register(data: any): void {
    setIcons(data)
}

export default MIcon
