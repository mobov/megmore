import { Component, Prop, Emit, Model, Provide, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TimePickerBase from './mixins/base'
import MTimePickerHeader from './components/header'
import MTimePickerPanelTime from './components/panel-time'
import { VNode } from 'vue'

const prefix = 'm-time-picker'

@Component({ components: {
        MTimePickerHeader,
        MTimePickerPanelTime
}})
export default class MTimePicker extends mixins(TimePickerBase) {

    @Prop({ type: Boolean, default: false })
    private ampm!: boolean

    @Prop({ type: String, default: 'list' })
    private timeSelectType!: 'list' | 'clock'

    private handleValueInput(val: any): void {
        console.log(val)
    }

    public render(): VNode {
        const { baseClasses, ampm, type, timeSelectType } = this
        const { valueType } = this.DateStore

        const RPanel = ()=>{
            return <MTimePickerPanelTime ampm={ampm} timeSelectType={timeSelectType} type={type} />
        }

        return (
            <div staticClass={prefix} class={baseClasses}>
                <MTimePickerHeader ampm={ampm} type={type} />
                <transition>
                    <div class={`${prefix}__main`}>{RPanel()}</div>
                </transition>
            </div>
        )
    }
    public created(){
        this.DateStore.SET_PICKER_TYPE('time')
        this.DateStore.SET_VALUE_TYPE('time')
    }
}
