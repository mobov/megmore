/**
 * 时间选择器头部显示板
 */
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const name = 'MTimePickerHeader'
const prefix = 'm-time-picker-header'

@Component({
    name,
})
export default class MTimePickerHeader extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Boolean })
    private anpm!: boolean

    @Prop({ type: Date, default: new Date() })
    private value!: Date

    get classes(): any {
        return {
            [`bg-${this.type}`]: this.type,
        }
    }

    public render(): VNode {
        const { classes, value } = this

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div class={`${prefix}-date`}>
                    <div staticClass={`${prefix}-date--year`}>{value.getFullYear()}</div>
                    <div staticClass={`${prefix}-date--day`}>{value.getMonth()}-{value.getDate()}</div>
                </div>
                <div class={`${prefix}-time`}>
                    <div staticClass={`${prefix}-time--hour`}>{value.getHours()}:{value.getMinutes()}</div>
                    <div staticClass={`${prefix}-time--ampm`}>
                        <div>AM</div>
                        <div>PM</div>
                    </div>
                </div>
            </div>
        )
    }
}
