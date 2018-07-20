import {Component, Prop, Emit, Vue, Inject, Model, Provide, Watch} from 'vue-property-decorator'
import MButton from '@/components/button'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const prefix = 'm-time-picker-panel-date'

@Component({ components: { MButton, MIcon }})

export default class MTimePickerPanelDate extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Number, default: 1950 })
    private min!: number

    @Prop({ type: Number, default: 2050 })
    private max!: number

    @Prop({ type: Number, default: 0 })
    private firstDayOfWeek!: number

    @Inject() DateStore!: any

    get year(): number {
        return this.DateStore.dateValue.getFullYear()
    }
    get month(): number {
        return this.DateStore.dateValue.getMonth()
    }
    get date(): number {
        return this.DateStore.dateValue.getDate()
    }
    viewValue: number = this.DateStore.value
    get viewDateValue(): Date {
        return new Date(this.viewValue)
    }
    set viewDateValue(val: any) {
        this.viewValue = val
    }
    get viewYear(): number {
        return this.viewDateValue.getFullYear()
    }
    get viewMonth(): number {
        return this.viewDateValue.getMonth()
    }
    get viewDate(): number {
        return this.viewDateValue.getDate()
    }
    public handleYearClick(): void {

    }
    public handleMonthToggle(action: 'prev' | 'next'): void {
        const date = new Date(this.viewValue)
        const month = date.getMonth()
        date.setMonth( action === 'prev' ? month - 1 : month + 1)
        this.viewValue = date.getTime()
    }

    public handleDateClick(year: number, month: number, date: number): void {
        if(year === this.year &&
           month === this.month &&
           date === this.date) { return }
        const temp = new Date(this.viewValue)
        if (year !== this.year) { temp.setFullYear(year) }
        if (year !== this.month) { temp.setMonth(month) }
        if (year !== this.date) { temp.setDate(date) }
        this.DateStore.update(temp.getTime())
    }

    public render(): VNode {

        const { DateStore, year, month, date,
                viewDateValue, viewYear, viewMonth, viewDate,
                handleDateClick, handleMonthToggle } = this

        const WeekMap = ['日', '一', '二', '三', '四', '五', '六']

        const viewMonthDays = viewDateValue.maxDayOfMonth()
        const viewFirstWeekDay = viewDateValue.firstWeekDay()

        const isCurMonth = viewYear === year && viewMonth === month
        const RTableHead = () => {
            const Tds: any = []
            WeekMap.forEach(week => Tds.push(<td>{week}</td>))
            return (<thead><tr>{Tds}</tr></thead>)
        }

        const RTableBody = () => {
            const Trs: any = []
            let Tds: any = []
            for(let pre = 0; pre < viewFirstWeekDay; pre ++) {
                Tds.push(<td> </td>)
            }
            for (let tempDate = 1; tempDate <= viewMonthDays; tempDate ++){
                const isCurDate = isCurMonth && (tempDate === date)
                Tds.push(<td><MButton onClick={()=>handleDateClick(viewYear, viewMonth, tempDate)} class="m--m-0 m--p-0" shape="circle" variety={isCurDate ? 'normal' : 'flat'} type={isCurDate ? 'primary' : 'legacy'}>{tempDate}</MButton></td>)
                if((tempDate + viewFirstWeekDay) %7 === 0 || tempDate === viewMonthDays){
                    Trs.push(<tr>{Tds}</tr>)
                    Tds = []
                }
            }

            return (<tbody>{Trs}</tbody>)
        }

        return (
            <div staticClass={prefix}>
                <div class={`${prefix}__header`}>
                    <div staticClass={`${prefix}__header-year`}>
                        <MButton variety="flat" type="legacy">{viewYear}</MButton>
                    </div>
                    <div staticClass={`${prefix}__header-handler`}>
                        <MButton variety="flat" onClick={()=>handleMonthToggle('prev')} shape="circle" type="legacy"><MIcon name="navigate_before" /></MButton>
                        <MButton variety="flat" onClick={()=>handleMonthToggle('next')} shape="circle" type="legacy"><MIcon name="navigate_next" /></MButton>
                    </div>
                 </div>
                <table class={`${prefix}__table`}>
                    {RTableHead()}
                    {RTableBody()}
                </table>
            </div>
        )
    }
}
