import { MIcon, setIcons} from './icon'

/* istanbul ignore next */
MIcon.install = function install(Vue) {
  Vue.component(MIcon.name, MIcon)
}
MIcon.register = function register(data) {
    setIcons(data)
}
export { MIcon }
export default MIcon
