/**
 * 时间选择器头部显示板
 */
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const prefix = 'm-time-picker-header'

@Component
export default class MTimePickerHeader extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Boolean })
    private anpm!: boolean

    @Prop({ type: Number, default: new Date().getTime() })
    private value!: number

    get classes(): any {
        return {
            [`m--bg-${this.type}`]: this.type,
        }
    }

    public render(): VNode {
        const { classes } = this
        const value = new Date(this.value)
        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div class={`${prefix}__date`}>
                    <div staticClass={`${prefix}__date-year`}>{value.getFullYear()}</div>
                    <div staticClass={`${prefix}__date-day`}>{value.getMonth()}-{value.getDate()}</div>
                </div>
                <div class={`${prefix}__time`}>
                    <div staticClass={`${prefix}__time-hour`}>{value.getHours()}:{value.getMinutes()}</div>
                    <div staticClass={`${prefix}__time-ampm`}>
                        <div>AM</div>
                        <div>PM</div>
                    </div>
                </div>
            </div>
        )
    }
}
