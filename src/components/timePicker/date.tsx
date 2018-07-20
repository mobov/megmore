import '@/utils/date'
import { Component, Prop, Emit, Model, Provide, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TimePickerBase from './mixins/base'
import MTimePickerHeader from './components/header'
import MTimePickerPanelDate from './components/panel-date'
import { VNode } from 'vue'


const prefix = 'm-date-picker'

@Component({ components: { MTimePickerHeader, MTimePickerPanelDate }})
export default class MDatePicker extends mixins(TimePickerBase) {

    @Prop({ type: Boolean, default: false })
    private ampm!: boolean

    @Prop({ type: Number, default: 0 })
    private firstDayOfWeek!: number

    public handleValueInput(val: any): void {
        console.log(val)
    }
    public render(): VNode {
        console.log(this)
        const { baseClasses, ampm, type, firstDayOfWeek,
                handleValueInput } = this

        return (
            <div staticClass={prefix} class={baseClasses}>
                <MTimePickerHeader ampm={ampm} type={type} />
                <div class={`${prefix}__main`}>
                    <MTimePickerPanelDate firstDayOfWeek={firstDayOfWeek} type={type} />
                </div>
            </div>
        )
    }
}
