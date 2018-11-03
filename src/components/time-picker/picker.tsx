import { Component, Prop, Emit, Model, Provide, Vue } from 'vue-property-decorator'
import {Color, DatePickerType} from "@/types/model"
import { mixins } from 'vue-class-component'
import TimePickerBase from './mixins'
import MTimePickerHeader from './components/header'
import MTimePickerPanelDate from './components/panel-date'
import MTimePickerPanelYear from './components/panel-year'
import MTimePickerPanelMonth from './components/panel-month'
import MTimePickerPanelTime from './components/panel-time'
import MTimePickerHandler from './components/handler'
import { VNode } from 'vue'

const prefix = 'm-time-picker'

@Component({ components: {
        MTimePickerHeader,
        MTimePickerPanelDate,
        MTimePickerPanelYear,
        MTimePickerPanelMonth,
        MTimePickerPanelTime,
        MTimePickerHandler,
    }})
export default class MTimePicker extends mixins(TimePickerBase) {

    @Prop({ type: String, default: 'primary' })
    private color!: Color

    @Prop({ type: Number, default: 2 })
    private elevation!: number

    @Prop({ type: Boolean, default: false })
    private landscope!: boolean

    @Prop({ type: String, default: 'list' })
    private timeSelectType!: 'list' | 'clock'

    get classes(): any {
        const { elevation, landscope, confirmation} = this
        return{
            [`m--elevation-${elevation}`]: elevation,
            [`m--landscope`]: landscope,
            [`m--confirmation`]: confirmation,
        }
    }

    public handleActive(type: DatePickerType) {
        if (['datetime', 'date'].includes(this.pickerType)) {
            this.DateStore.SET_ACTIVE_TYPE(type)
        }
    }

    public render(): VNode {
        const { classes, color, firstDayOfWeek, max, min,
            handleActive, confirmation, handleConfirm, handleCancel } = this
        const { activeType, pickerType } = this.DateStore

        const RPanel = () => {
            switch (activeType) {
                case 'date':  return <MTimePickerPanelDate max={max}
                                                           min={min}
                                                           color={color}
                                                           firstDayOfWeek={firstDayOfWeek} />;
                case 'year':  return <MTimePickerPanelYear max={max}
                                                           min={min}
                                                           onPick={() => {handleActive('date')}}/>;
                case 'month': return <MTimePickerPanelMonth onPick={() => {handleActive('date')}} />;
                default:  return <MTimePickerPanelTime color={color}
                                                       onPick={() => {handleActive('date')}} />;
            }
        }

        const RHandler = () => {
            return confirmation ? <MTimePickerHandler onConfirm={handleConfirm}
                                                      onCancel={handleCancel} /> : ''
        }

        return (
            <div staticClass={`${prefix} m--${pickerType}`} class={classes}>
                <MTimePickerHeader color={color} />
                <transition>
                    <div class={`${prefix}__main`}>
                        <div class={`${prefix}__panel`}>{RPanel()}</div>
                        {RHandler()}
                    </div>
                </transition>
            </div>
        )
    }
}
