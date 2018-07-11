import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { Model } from '@/types'

const name = 'MTimePickerHeader'
const prefix = 'm-time-picker-header'

@Component({
    name,
})
export default class MTimePickerHeader extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Model.Color

    @Prop({ type: Boolean })
    private anpm!: boolean

    get classes(): any {
        return {
            [`bg-${this.type}`]: this.type,
        }
    }

    public render(): VNode {
        const { classes } = this
        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div class={`${prefix}-date`}>
                    <div staticClass={`${prefix}-date--year`}>2018</div>
                    <div staticClass={`${prefix}-date--day`}>04月05日</div>
                </div>
                <div class={`${prefix}-time`}>
                    <div staticClass={`${prefix}-time--hour`}>11:22</div>
                    <div staticClass={`${prefix}-time--ampm`}>
                        <div>AM</div>
                        <div>PM</div>
                    </div>
                </div>
            </div>
        )
    }
}
