import {Component, Prop, Emit, Vue, Inject, Model} from 'vue-property-decorator'
import MButton from '@/components/button'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Color } from '@/types/model'
import {emit} from "cluster";

const name = 'MTimePickerPanelDate'
const prefix = 'm-time-picker-panel-date'


const Years: any =  []
const Months: any = []
const Weeks: any = []
const Days: any = []

@Component({
    name,
    components: { MButton, MIcon },
})

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

    // @Prop({ type: String, default: new Date() })
    // private valueFormat!: any

    viewValue: number = this.value

    get classes(): any {
        return {
            // [`color-${this.type}`]: this.type,
        }
    }

    public handleMonthChange(): void {

    }
    public handleYearClick(): void {

    }
   // @emit('input')
    public handleDateClick(val: number, isCurDay: boolean = false): void {
        if(isCurDay) { return }
        // const { viewValue } = this
        const date = new Date(this.viewValue)
        date.setDate(val)
        this.viewValue = date.getTime()

    }

    public render(): VNode {

        const { classes, handleDateClick } = this
        const value = new Date(this.value)
        const viewValue = new Date(this.viewValue)
        console.log(viewValue)
        const nowDate = new Date()
        const WeekMap = ['日', '一', '二', '三', '四', '五', '六']
        const isCurMonth = viewValue.getFullYear() === nowDate.getFullYear() && viewValue.getMonth() === nowDate.getMonth()
        const viewMonthDays = viewValue.maxDayOfMonth()
        const viewFirstWeekDay = viewValue.firstWeekDay()
        const viewDate = viewValue.getDate()


        const RTableHead = () => {
            const Tds: any = []

            WeekMap.forEach(week => Tds.push(<td>{week}</td>))

            return (<thead><tr>{Tds}</tr></thead>)
        }
        console.log(viewFirstWeekDay)
        const RTableBody = () => {
            const Trs: any = []
            let Tds: any = []
            for(let pre = 0; pre < viewFirstWeekDay; pre++) {
                Tds.push(<td> </td>)
            }
            if(isCurMonth){
                for (let day = 1; day <= viewMonthDays; day++){
                    const isCurDay = day === viewDate
                    Tds.push(<td><MButton onClick={()=>handleDateClick(day, isCurDay)} style="margin: 0" shape="circle" variety={isCurDay ? 'normal' : 'flat'} type={isCurDay ? 'primary' : 'legacy'}>{day}</MButton></td>)
                    if((day + viewFirstWeekDay) %7 === 0 || day === viewMonthDays){
                        Trs.push(<tr>{Tds}</tr>)
                        Tds = []
                    }
                }
            } else {
                for (let day = 1; day <= viewMonthDays; day++){
                    Tds.push(<td><MButton onClick={()=>handleDateClick(day)} style="margin: 0" shape="circle" variety="flat" type="legacy">{day}</MButton></td>)
                    if((day + viewFirstWeekDay) %7 === 0 || day === viewMonthDays){
                        Trs.push(<tr>{Tds}</tr>)
                        Tds = []
                    }
                }
            }


            return (<tbody>{Trs}</tbody>)
        }

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div class={`${prefix}--header`}>
                    <div staticClass={`${prefix}--header-year`}>
                        <MButton variety="flat" type="legacy">2018</MButton>
                    </div>
                    <div staticClass={`${prefix}--header-handler`}>
                        <MButton variety="flat" shape="circle" type="legacy"><MIcon name="navigate_before" /></MButton>
                        <MButton variety="flat" shape="circle" type="legacy"><MIcon name="navigate_next" /></MButton>
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
