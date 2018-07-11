import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MTimePickerHeader from './parts/header'
import MTimePickerPanelDate from './parts/panel-date'
import { VNode } from 'vue'
import { Model } from '@/types'

const name = 'MDatePicker'
const prefix = 'm-date-picker'

@Component({
    name,
    components: { MTimePickerHeader, MTimePickerPanelDate },
})
export default class MDatePicker extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Model.Color

    @Prop({ type: Boolean, default: false })
    private ampm!: boolean

    @Prop({ type: Number })
    private elevation!: number

    get classes(): any {
        return{
            [`elevation-${this.elevation}`]: this.elevation,
        }
    }

    public render(): VNode {
        const { classes, ampm, type } = this

        return (
            <div staticClass={prefix} class={classes}>
                <MTimePickerHeader ampm={ampm} type={type}/>
                <div class={`${prefix}--main`}>
                    <MTimePickerPanelDate type={type}/>
                </div>
            </div>
        )
    }
}
