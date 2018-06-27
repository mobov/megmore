import './layout.scss'
import MContainer from './container'
import MRow from './row'
import MCol from './col'

/* istanbul ignore next */
MContainer.install = function install(Vue) {
  Vue.component(MContainer.name, MContainer)
}
MRow.install = function install(Vue) {
    Vue.component(MRow.name, MRow)
}
MCol.install = function install(Vue) {
    Vue.component(MCol.name, MCol)
}

export {
    MContainer,
    MRow,
    MCol,
}
