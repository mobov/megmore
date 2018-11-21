import './app-bar.scss'
import MAppBar from './app-bar'

/* istanbul ignore next */
MAppBar.install = function install(Vue: any): void {
  Vue.component(MAppBar.name, MAppBar)
}

export default MAppBar
