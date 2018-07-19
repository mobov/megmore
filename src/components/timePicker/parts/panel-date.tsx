import {Component, Prop, Emit, Vue, Inject, Model} from 'vue-property-decorator'
import MButton from '@/components/button'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const prefix = 'm-time-picker-panel-date'


const Years: any =  []
const Months: any = []
const Weeks: any = []
const Days: any = []

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

    @Model('change', { type: Number, default: new Date().getTime() })
    private value: number

    viewValueStamp: number = this.value

    get classes(): any {
        return {
            // [`color-${this.type}`]: this.type,
        }
    }

    get propValue(): Date {
        return new Date(this.value)
    }
    get propYear(): number {
        return this.propValue.getFullYear()
    }
    get propMonth(): number {
        return this.propValue.getMonth()
    }
    get propDate(): number {
        return this.propValue.getDate()
    }
    get viewValue(): any {
        return new Date(this.viewValueStamp)
    }
    set viewValue(val: any) {
        this.viewValueStamp = val
    }
    get viewYear(): number {
        return this.viewValue.getFullYear()
    }
    get viewMonth(): number {
        return this.viewValue.getMonth()
    }
    get viewDate(): number {
        return this.viewValue.getDate()
    }
    public handleYearClick(): void {

    }
    public handleMonthToggle(action: 'prev' | 'next'): void{
        const date = new Date(this.viewValue)
        const month = date.getMonth()
        date.setMonth( action === 'prev' ? month - 1 : month + 1)
        this.viewValue = date.getTime()
    }

    @Emit('input')
    public handleDateClick(year: number, month: number, date: number): void {
        if(year === this.propYear &&
           month === this.propMonth &&
           date === this.propDate) { return }
        //        console.log(temp.getTime())
        const temp = new Date(this.viewValue)

        if (year !== this.propYear) { temp.setFullYear(year) }
        if (year !== this.propMonth) { temp.setMonth(month) }
        if (year !== this.propDate) { temp.setDate(date) }
        this.viewValue = temp.getTime()
    }

    public render(): VNode {

        const { propValue, propYear, propMonth, propDate,
                viewValue, viewYear, viewMonth, viewDate,
                classes, handleDateClick, handleMonthToggle } = this

        const WeekMap = ['日', '一', '二', '三', '四', '五', '六']

        const viewMonthDays = viewValue.maxDayOfMonth()
        const viewFirstWeekDay = viewValue.firstWeekDay()

        const isCurMonth = viewYear === propYear && viewMonth === propMonth
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
            for (let date = 1; date <= viewMonthDays; date ++){
                const isCurDate = isCurMonth && (date === viewDate)
                Tds.push(<td><MButton onClick={()=>handleDateClick(viewYear, viewMonth, date)} style="margin: 0" shape="circle" variety={isCurDate ? 'normal' : 'flat'} type={isCurDate ? 'primary' : 'legacy'}>{date}</MButton></td>)
                if((date + viewFirstWeekDay) %7 === 0 || date === viewMonthDays){
                    Trs.push(<tr>{Tds}</tr>)
                    Tds = []
                }
            }

            return (<tbody>{Trs}</tbody>)
        }

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div class={`${prefix}--header`}>
                    <div staticClass={`${prefix}--header-year`}>
                        <MButton variety="flat" type="legacy">{viewYear}</MButton>
                    </div>
                    <div staticClass={`${prefix}--header-handler`}>
                        <MButton variety="flat" onClick={()=>handleMonthToggle('prev')} shape="circle" type="legacy"><MIcon name="navigate_before" /></MButton>
                        <MButton variety="flat" onClick={()=>handleMonthToggle('next')} shape="circle" type="legacy"><MIcon name="navigate_next" /></MButton>
                    </div>
                 </div>
                <table class={`${prefix}-table`}>
                    {RTableHead()}
                    {RTableBody()}
                </table>
            </div>
        )
    }
}
