import '@/styles/components/layout.scss'
import MContainer from '@/components/layout/container'
import MRow from '@/components/layout/row'
import MCol from '@/components/layout/col'
import MFlexFiller from '@/components/layout/flex-filler'

/* istanbul ignore next */
MContainer.install = function install(Vue: any): void {
    Vue.component(MContainer.name, MContainer)
}
MRow.install = function install(Vue: any): void {
    Vue.component(MRow.name, MRow)
}
MCol.install = function install(Vue: any): void {
    Vue.component(MCol.name, MCol)
}
MFlexFiller.install = function install(Vue: any): void {
    Vue.component(MFlexFiller.name, MFlexFiller)
}

export {
    MContainer,
    MRow,
    MCol,
    MFlexFiller,
}
