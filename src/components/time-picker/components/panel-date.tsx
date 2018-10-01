import { Component, Prop, Emit, Vue, Inject, Model, Provide, Watch } from 'vue-property-decorator'
import MButton from '@/components/button'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const prefix = 'm-time-picker-panel-date'
const WeekMap = ['日', '一', '二', '三', '四', '五', '六']

@Component({ components: { MButton, MIcon }})

export default class MTimePickerPanelDate extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Number })
    private min!: number

    @Prop({ type: Number })
    private max!: number

    @Prop({ type: Number, default: 0 })
    private firstDayOfWeek!: number

    @Inject()
    private DateStore!: any

    private viewValue: number = this.DateStore.value

    get viewDateValue(): any {
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

    public handleMonthToggle(action: 'prev' | 'next'): void {
        const date = new Date(this.viewValue)
        const month = date.getMonth()
        date.setMonth(action === 'prev' ? month - 1 : month + 1)
        this.viewValue = date.getTime()
    }

    @Emit('pick')
    public handleDateClick(yearVal: number, monthVal: number, dateVal: number): void {
        const { year, month, date } = this.DateStore

        if (yearVal === year &&
            monthVal === month &&
            dateVal === date ) { return }

        const temp = new Date(this.viewValue)

        if (yearVal !== year)   { temp.setFullYear(yearVal) }
        if (monthVal !== month) { temp.setMonth(monthVal) }
        if (dateVal !== date)   { temp.setDate(dateVal) }

        this.DateStore.UPDATE(temp.getTime())
    }

    public render(): VNode {
        const { viewDateValue, viewYear, viewMonth,
                handleDateClick, handleMonthToggle } = this
        const { year, month, date } = this.DateStore
        const nowValue = new Date()
        const isNowDate = nowValue.getFullYear() === viewYear && nowValue.getMonth() === viewMonth
        const nowDate = nowValue.getDate()
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

            for (let pre = 0; pre < viewFirstWeekDay; pre ++) {
                Tds.push(<td> </td>)
            }
            for (let tempDate = 1; tempDate <= viewMonthDays; tempDate ++) {
                const isCurDate = isCurMonth && (tempDate === date)
                const isToday =  isNowDate && (tempDate === nowDate)

                Tds.push(<td><MButton class='m--m-0 m--p-0'
                                      size='sm'
                                      shape='circle'
                                      variety={isCurDate ? 'normal' : isToday ? 'outline' : 'flat'}
                                      color={isCurDate || isToday ? 'primary' : 'legacy'}
                                      onClick={() => handleDateClick(viewYear, viewMonth, tempDate)}>
                                {tempDate}
                             </MButton></td>)
                if ((tempDate + viewFirstWeekDay) % 7 === 0 || tempDate === viewMonthDays) {
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
                        <MButton variety='flat'
                                 color='legacy'
                                 onClick={() => this.DateStore.SET_ACTIVE_TYPE('year')}>
                            {viewYear}
                        </MButton>
                    </div>
                    <div staticClass={`${prefix}__header-handler`}>
                        <MButton variety='flat'
                                 shape='circle'
                                 color='legacy'
                                 onClick={() => handleMonthToggle('prev')}>
                            <MIcon name='navigate_before' />
                        </MButton>
                        <MButton variety='flat'
                                 shape='circle'
                                 color='legacy'
                                 onClick={() => handleMonthToggle('next')} >
                            <MIcon name='navigate_next' />
                        </MButton>
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
