import { Component, Prop, Emit, Model, Provide, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TimePickerBase from './mixins/base'
import MTimePickerHeader from './components/header'
import MTimePickerPanelDate from './components/panel-date'
import MTimePickerPanelYear from './components/panel-year'
import MTimePickerPanelMonth from './components/panel-month'
import MTimePickerPanelTime from './components/panel-time'
import { VNode } from 'vue'
import { DateValueType } from "@/types/model"

const prefix = 'm-datetime-picker'

@Component({ components: { MTimePickerHeader, MTimePickerPanelDate }})
export default class MDatetimePicker extends mixins(TimePickerBase) {

    @Prop({ type: Boolean, default: false })
    private ampm!: boolean

    @Prop({ type: Number, default: 0 })
    private firstDayOfWeek!: number

    private activeValueType: DateValueType = 'date'

    private handleValueInput(val: any): void {
        console.log(val)
    }

    // 面板切换
    private handlePanelSwitch(type: DateValueType): void{
        this.activeValueType = type
    }
    public render(): VNode {
        const { baseClasses, activeValueType,
                ampm, type, firstDayOfWeek, max, min,
                handlePanelSwitch } = this

        const RPanel = ()=>{
            switch (activeValueType) {
                case 'date':  return <MTimePickerPanelDate max={max} min={min} firstDayOfWeek={firstDayOfWeek} type={type} onYearClick={handlePanelSwitch} />;
                case 'year':  return <MTimePickerPanelYear max={max} min={min} />;
                case 'month': return <MTimePickerPanelMonth />;
                case 'time':  return <MTimePickerPanelTime ampm={ampm} type={type} valueType={'time'}/>;
            }
        }

        return (
            <div staticClass={prefix} class={baseClasses}>
                <MTimePickerHeader ampm={ampm} type={type} onSwitch={handlePanelSwitch} />
                <div class={`${prefix}__main`}>{RPanel()}</div>
            </div>
        )
    }
}
