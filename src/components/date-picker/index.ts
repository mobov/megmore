import MDatePicker from '@/components/date-picker/datepicker'

/* istanbul ignore next */
MDatePicker.install = function install(Vue: any) {
    Vue.component(MDatePicker.name, MDatePicker)
}

export default MDatePicker
