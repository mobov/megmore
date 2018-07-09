import './layout.scss'
import MContainer from './container'
import MRow from './row'
import MCol from './col'
import MFlexFiller from './flex-filler'

/* istanbul ignore next */
MContainer.install = function install(Vue): void {
  Vue.component(MContainer.name, MContainer)
}
MRow.install = function install(Vue): void {
    Vue.component(MRow.name, MRow)
}
MCol.install = function install(Vue): void {
    Vue.component(MCol.name, MCol)
}
MFlexFiller.install = function install(Vue): void {
    Vue.component(MFlexFiller.name, MFlexFiller)
}

export {
    MContainer,
    MRow,
    MCol,
    MFlexFiller,
}
