/**
 * 时间选择器头部显示板
 */
import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import { VNode } from 'vue'
import { Color } from '@/types/model'
import { DatePickerType } from "@/types/model"
const WeekMap = [ '星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
const prefix = 'm-time-picker-header'

@Component
export default class MTimePickerHeader extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Inject() DateStore!: any

    get classes(): any {

        return {
            [`m--bg-${this.type}`]: this.type,
            [`m--${this.DateStore.pickerType}`]: true,
        }
    }

    private handleAMToggle(val: boolean, oldVal: boolean){
        if(val === oldVal) { return }
        this.DateStore.SET_AM(val)
    }

    public render(): VNode {
        const { classes, handleAMToggle } = this
        const { year, month, weekDay, date, hours, minutes,
                pickerType, activeType, ampm, am } = this.DateStore

        const RDate = () => {
            return ['datetime', 'date'].includes(pickerType) ?
            (<div class={`${prefix}__date`}>
                <div class={{'m--active': activeType === 'year'}}
                     staticClass={`${prefix}__date-year`}>
                    <a onClick={() => {this.DateStore.SET_ACTIVE_TYPE('year')}}>{year}</a>
                    <span staticClass={`${prefix}__date-weekDay`}>{WeekMap[weekDay]}</span>
                 </div>
                <div staticClass={`${prefix}__date-date`}>
                    <a class={{'m--active': activeType === 'month'}} onClick={() => {
                        this.DateStore.SET_ACTIVE_TYPE('month')
                    }}>{(month + 1).dateZeroize()}</a>-
                    <a class={{'m--active': activeType === 'date'}} onClick={() => {
                        this.DateStore.SET_ACTIVE_TYPE('date')
                    }}>{date.dateZeroize()}</a>

                </div>
            </div>) : <div/>
        }

        const RTime = () => {
            return ['datetime', 'time'].includes(pickerType) ?
            (<div class={`${prefix}__time`}>
                { ampm ?
                    <div staticClass={`${prefix}__time-ampm`}>
                        <a class={{'m--active': am }} onClick={()=>{handleAMToggle(true, am)}}>AM</a>
                        <a class={{'m--active': !am }} onClick={()=>{handleAMToggle(false, am)}}>PM</a>
                    </div> : <div/>
                }
                <div staticClass={`${prefix}__time-hours`}>
                    <a class={{'m--active': activeType === 'hours'}} onClick={() => {
                        this.DateStore.SET_ACTIVE_TYPE('hours')
                    }}>{hours.dateZeroize()}</a>:
                    <a class={{'m--active': activeType === 'minutes'}} onClick={() => {
                        this.DateStore.SET_ACTIVE_TYPE('minutes')
                    }}>{minutes.dateZeroize()}</a>
                </div>
            </div>) : <div/>
        }

        return (
            <div staticClass={`${prefix}`} class={classes}>
                {RDate()}
                {RTime()}
            </div>
        )
    }
}
