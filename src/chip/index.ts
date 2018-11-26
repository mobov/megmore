
import MChip from './chip'
/* istanbul ignore next */
MChip.install = function install(Vue: any) {
    Vue.component(MChip.name, MChip)
}

export default MChip
