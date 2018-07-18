import '@/utils/date'
import { Component, Prop, Emit, Vue, Model } from 'vue-property-decorator'
import MTimePickerHeader from './parts/header'
import MTimePickerPanelDate from './parts/panel-date'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const name = 'MDatePicker'
const prefix = 'm-date-picker'

@Component({
    name,
    components: { MTimePickerHeader, MTimePickerPanelDate },
})
export default class MDatePicker extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Number })
    private elevation!: number

    @Model('change', { type: String })
    private value: string

    @Prop({ type: Boolean, default: false })
    private ampm!: boolean


    get classes(): any {
        return{
            [`elevation-${this.elevation}`]: this.elevation,
        }
    }

    public render(): VNode {
        const { classes, ampm, value, type } = this

        return (
            <div staticClass={prefix} class={classes}>
                <MTimePickerHeader ampm={ampm} type={type} />
                <div class={`${prefix}--main`}>
                    <MTimePickerPanelDate value={value} type={type} />
                </div>
            </div>
        )
    }
}
