import '@/utils/date'
import MTimePicker from './picker'
/* istanbul ignore next */
MTimePicker.install = function install(Vue: any) {
    Vue.component(MTimePicker.name, MTimePicker)
}
export default MTimePicker
