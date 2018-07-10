import MButton from '@/components/button/button'

/* istanbul ignore next */
MButton.install = function install(Vue: any) {
    Vue.component(MButton.name, MButton)
}
export default MButton
