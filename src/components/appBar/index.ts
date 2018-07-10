import MAppBar from '@/components/appBar/appBar'

/* istanbul ignore next */
MAppBar.install = function install(Vue: any): void {
  Vue.component(MAppBar.name, MAppBar)
}

export default MAppBar
