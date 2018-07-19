import '@/utils/date'
import { Component, Prop, Emit, Vue, Model } from 'vue-property-decorator'
import MTimePickerHeader from './parts/header'
import MTimePickerPanelDate from './parts/panel-date'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const prefix = 'm-date-picker'

@Component({ components: { MTimePickerHeader, MTimePickerPanelDate }})
export default class MDatePicker extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Number })
    private elevation!: number

    @Model('change', { type: Date, default: new Date() })
    private value: Date

    @Prop({ type: Boolean, default: false })
    private ampm!: boolean

    get classes(): any {
        return{
            [`m--elevation-${this.elevation}`]: this.elevation,
        }
    }
    public handleValueInput(val: any): void {
        console.log(val)
    }
    public render(): VNode {
        console.log(this)
        const { classes, ampm, type,
                handleValueInput} = this
        const value = this.value.getTime()
        console.log(value)
        return (
            <div staticClass={prefix} class={classes}>
                <MTimePickerHeader value={value} ampm={ampm} type={type} />
                <div class={`${prefix}__main`}>
                    <MTimePickerPanelDate value={value} onInput={handleValueInput} type={type} />
                </div>
            </div>
        )
    }
}
