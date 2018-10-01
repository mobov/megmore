import { Component, Prop, Emit, Vue, Inject, Model, Provide, Watch } from 'vue-property-decorator'
import { strStyles, getStyle } from 'es-treasure'
import MButton from '@/components/button'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Color, DateTimeValueType } from '@/types/model'

const prefix = 'm-time-picker-panel-time'
const baseFont: any = getStyle(document.documentElement, 'font-size')
const clockSize = 12 * Number(baseFont.substring(0, baseFont.length - 2))
const clockStyle = {
    height: `${clockSize}px`,
    width:  `${clockSize}px`,
}

@Component({ components: { MButton, MIcon }})
export default class MTimePickerPanelTime extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: String, default: 'list' })
    private timeSelectType!: 'list' | 'clock'

    @Prop({ type: Number, default: 1 })
    private hourStep!: number

    @Prop({ type: Number, default: 1 })
    private minuteStep!: number

    @Inject()
    private DateStore!: any

    @Emit('pick')
    public handleClick(val: number, type: DateTimeValueType): void {
        this.DateStore.SET_ACTIVE_TYPE(type)
        this.DateStore.UPDATE(
            (type === 'hours' && this.DateStore.ampm && !this.DateStore.am) ?
                val + 12 : val, type)
    }

    public render(): VNode {
        const { handleClick, timeSelectType, hourStep, minuteStep } = this
        const { ampm } = this.DateStore
        const Result = []

        const RList = (type: DateTimeValueType) => {
            const min = 0
            const max = type === 'hours' ? ampm ? 11 : 23 : 59
            const step =  type === 'hours' ? hourStep : minuteStep
            const time = this.DateStore[type]
            const Temps = []

            for (let tempTime = min; tempTime <= max; tempTime += step) {
                const isCurrent = tempTime === time
                Temps.push(<MButton onClick={ () => handleClick(tempTime, type)}
                                    size="sm"
                                    class="m--m-0 m--p-0 m--block" shape="round"
                                    variety={isCurrent ? 'normal' : 'flat'}
                                    color={isCurrent ? 'primary' : 'legacy'}>{tempTime}</MButton>)
            }

            return (<div staticClass={`${prefix}__list ${prefix}__list-${type}`}>{Temps}</div>)
        }

        if (timeSelectType === 'list') {
            Result.push(RList('hours'))
            Result.push(RList('minutes'))
        } else {
            // todo
        }

        return (
            <div staticClass={prefix}>{Result}</div>
        )
    }
}
