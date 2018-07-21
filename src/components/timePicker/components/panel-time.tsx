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
    width:  `${clockSize}px`
}

@Component({ components: { MButton, MIcon }})
export default class MTimePickerPanelTime extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Boolean, default: false })
    private ampm!: boolean

    @Prop({ type: String, default: 'list' })
    private displayType!: 'list' | 'clock'

    @Prop({ type: String, default: 'hours' })
    private valueType!: DateTimeValueType

    @Inject() DateStore!: any

    public handleClick(val: number, type: DateTimeValueType): void {

    }

    public render(): VNode {

        const { handleClick, valueType, displayType } = this
        
        const { hours, minutes } = this.DateStore

        const Result = []

        const RList = (type: DateTimeValueType) => {
            const min = 0
            const max = type === 'hours' ? 23 : 59
            const time = this.DateStore[type]
            console.log(time)
            let Temps = []

            for (let tempTime = min; tempTime <= max; tempTime ++){
                const isCurrent = tempTime === time
                Temps.push(<MButton onClick={()=>handleClick(tempTime, type)}
                                    class="m--m-0 m--p-0 m--block" shape="square"
                                    variety={isCurrent ? 'normal' : 'flat'}
                                    type={isCurrent ? 'primary' : 'legacy'}>{tempTime}</MButton>)
            }

            return (<div staticClass={`${prefix}__list`}>{Temps}</div>)
        }

        if(displayType === 'list') {
            Result.push(RList('hours'))
            Result.push(RList('minutes'))
        }else{

        }

        return (
            <div staticClass={prefix}>{Result}</div>
        )
    }
}
