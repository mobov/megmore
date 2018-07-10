import MAvatar from '@/components/avatar/avatar'

/* istanbul ignore next */
MAvatar.install = function install(Vue: any): void {
  Vue.component(MAvatar.name, MAvatar)
}

export default MAvatar
