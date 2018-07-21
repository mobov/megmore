/**
 * 时间选择器头部显示板
 */
import {Component, Prop, Emit, Vue, Inject} from 'vue-property-decorator'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const prefix = 'm-time-picker-header'

@Component
export default class MTimePickerHeader extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Boolean })
    private anpm!: boolean

    @Inject() DateStore!: any

    get classes(): any {
        return {
            [`m--bg-${this.type}`]: this.type,
        }
    }

    public render(): VNode {
        const { classes } = this
        console.log(this.DateStore)
        const { year, month, date, hours, minutes, seconds } = this.DateStore

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div class={`${prefix}__date`}>
                    <div staticClass={`${prefix}__date-year`} >{year}</div>
                    <div staticClass={`${prefix}__date-day`} >{(month + 1).dateZeroize()}-{date.dateZeroize()}</div>
                </div>
                <div class={`${prefix}__time`}>
                    <div staticClass={`${prefix}__time-hour`} >{hours.dateZeroize()}:{minutes.dateZeroize()}:{seconds.dateZeroize()}</div>
                    {/*<div staticClass={`${prefix}__time-ampm`} >*/}
                        {/*<div>AM</div>*/}
                        {/*<div>PM</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}
