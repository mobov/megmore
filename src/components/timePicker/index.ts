import '@/utils/date'
import MDatetimePicker from './datetime'
import MDatePicker from "./date"
/* istanbul ignore next */
MDatetimePicker.install = function install(Vue: any) {
    Vue.component(MDatetimePicker.name, MDatetimePicker)
}
MDatePicker.install = function install(Vue: any) {
    Vue.component(MDatePicker.name, MDatePicker)
}
export {
    MDatetimePicker,
    MDatePicker,
}
