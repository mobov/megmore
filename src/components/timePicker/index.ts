import '@/utils/date'
import MDatetimePicker from './datetime'
/* istanbul ignore next */
MDatetimePicker.install = function install(Vue: any) {
    Vue.component(MDatetimePicker.name, MDatetimePicker)
}
export {
    MDatetimePicker,
}
