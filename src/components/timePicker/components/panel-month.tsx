import {Component, Prop, Emit, Vue, Inject, Model, Provide, Watch} from 'vue-property-decorator'
import MButton from '@/components/button'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const prefix = 'm-time-picker-panel-month'

@Component({ components: { MButton }})

export default class MTimePickerPanelMonth extends Vue {

    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Array })
    public disabledValue!: number

    @Inject() DateStore!: any

    public handleClick(month: number): void {
        console.log(month)
        this.DateStore.UPDATE(month, 'month')
    }

    public render(): VNode {

        const { handleClick } = this
        const { month } = this.DateStore
        console.log(month)
        const RCols = () => {
            const Cols: any = []

            for (let tempValue = 1; tempValue <= 12; tempValue ++){
                const isCurrent = tempValue === month
                Cols.push(<MButton onClick={()=>handleClick(tempValue)} class="m--m-0 m--p-0" shape="square" variety={isCurrent ? 'normal' : 'flat'} type={isCurrent ? 'primary' : 'legacy'}>{tempValue}</MButton>)
            }

            return Cols
        }

        return (
            <div staticClass={prefix}>
                {RCols()}
            </div>
        )
    }
}