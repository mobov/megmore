/**
 * 时间选择器头部显示板
 */
import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import { VNode } from 'vue'
import { Color } from '@/types/model'
import { DateValueType } from "@/types/model"
const WeekMap = [ '星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
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
            [`m--${this.DateStore.pickerType}`]: true,
        }
    }

    public render(): VNode {
        const { classes } = this
        const { year, month, weekDay, date, hours, minutes, valueType, pickerType } = this.DateStore

        const RDate = () => {
            return  ['datetime','date'].includes(pickerType) ?
            (<div class={`${prefix}__date`}>
                <div class={{'m--active': valueType === 'year'}}
                     staticClass={`${prefix}__date-year`}>
                    <a onClick={() => {this.DateStore.SET_VALUE_TYPE('year')}}>{year}</a>
                    <span staticClass={`${prefix}__date-weekDay`}>{WeekMap[weekDay]}</span>
                 </div>
                <div staticClass={`${prefix}__date-date`}>
                    <a class={{'m--active': valueType === 'month'}} onClick={() => {
                        this.DateStore.SET_VALUE_TYPE('month')
                    }}>{(month + 1).dateZeroize()}</a>-
                    <a class={{'m--active': valueType === 'date'}} onClick={() => {
                        this.DateStore.SET_VALUE_TYPE('date')
                    }}>{date.dateZeroize()}</a>

                </div>
            </div>) : ''
        }

        const RTime = () => {
            return ['datetime','time'].includes(pickerType) ?
            (<div class={`${prefix}__time`}>
                <div staticClass={`${prefix}__time-ampm`}>
                    <a class={{'m--active': valueType === 'hours'}}>AM</a>
                    <a class={{'m--active': valueType === 'hours'}}>PM</a>
                </div>
                <div staticClass={`${prefix}__time-hours`}>
                    <a class={{'m--active': valueType === 'hours'}} onClick={() => {
                        this.DateStore.SET_VALUE_TYPE('hours')
                    }}>{hours.dateZeroize()}</a>:
                    <a class={{'m--active': valueType === 'minutes'}} onClick={() => {
                        this.DateStore.SET_VALUE_TYPE('minutes')
                    }}>{minutes.dateZeroize()}</a>
                </div>
            </div>) : ''
        }

        return (
            <div staticClass={`${prefix}`} class={classes}>
                {RDate()}
                {RTime()}
            </div>
        )
    }
}
