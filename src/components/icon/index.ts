import { MIcon, setIcons} from './icon'

/* istanbul ignore next */
MIcon.install = function install(Vue): void {
  Vue.component(MIcon.name, MIcon)
}
MIcon.register = function register(data): void {
    setIcons(data)
}
export { MIcon }
export default MIcon
