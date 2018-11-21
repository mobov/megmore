import './avatar.scss'
import MAvatar from './avatar'

/* istanbul ignore next */
MAvatar.install = function install(Vue: any): void {
  Vue.component(MAvatar.name, MAvatar)
}

export default MAvatar
