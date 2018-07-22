import '@/utils/date'
import MDatetimePicker from './datetime'
import MDatePicker from './date'
import MTimePicker from './time'
/* istanbul ignore next */
MDatetimePicker.install = function install(Vue: any) {
    Vue.component(MDatetimePicker.name, MDatetimePicker)
}
MDatePicker.install = function install(Vue: any) {
    Vue.component(MDatePicker.name, MDatePicker)
}
MTimePicker.install = function install(Vue: any) {
    Vue.component(MTimePicker.name, MTimePicker)
}
export {
    MDatetimePicker,
    MDatePicker,
    MTimePicker,
}
