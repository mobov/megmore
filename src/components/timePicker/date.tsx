import { Component, Prop, Emit, Model, Provide, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TimePickerBase from './mixins/base'
import MTimePickerHeader from './components/header'
import MTimePickerPanelDate from './components/panel-date'
import MTimePickerPanelYear from './components/panel-year'
import MTimePickerPanelMonth from './components/panel-month'
import { VNode } from 'vue'

const prefix = 'm-date-picker'

@Component({ components: {
        MTimePickerHeader,
        MTimePickerPanelDate,
        MTimePickerPanelYear,
        MTimePickerPanelMonth
}})
export default class MDatePicker extends mixins(TimePickerBase) {

    @Prop({ type: Number, default: 0 })
    private firstDayOfWeek!: number

    private handleValueInput(val: any): void {
        console.log(val)
    }

    public render(): VNode {
        const { baseClasses, type, firstDayOfWeek, max, min} = this
        const { valueType } = this.DateStore

        const RPanel = ()=>{
            switch (valueType) {
                case 'date':  return <MTimePickerPanelDate max={max} min={min} firstDayOfWeek={firstDayOfWeek} type={type} />;
                case 'year':  return <MTimePickerPanelYear max={max} min={min} />;
                case 'month': return <MTimePickerPanelMonth />;
            }
        }

        return (
            <div staticClass={prefix} class={baseClasses}>
                <MTimePickerHeader type={type} />
                <transition>
                    <div class={`${prefix}__main`}>{RPanel()}</div>
                </transition>
            </div>
        )
    }
    public created(){
        this.DateStore.SET_PICKER_TYPE('date')
        this.DateStore.SET_VALUE_TYPE('date')
    }
}
