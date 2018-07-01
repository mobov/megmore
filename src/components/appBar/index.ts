import MAppBar from './appBar'

/* istanbul ignore next */
MAppBar.install = function install(Vue): void {
  Vue.component(MAppBar.name, MAppBar)
}

export default MAppBar
