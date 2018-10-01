import { Component, Prop, Emit, Vue, Inject, Model, Provide, Watch } from 'vue-property-decorator'
import MButton from '@/components/button'
import { VNode } from 'vue'
import { Color } from '@/types/model'

const prefix = 'm-time-picker-panel-year'

@Component({ components: { MButton }})

export default class MTimePickerPanelYear extends Vue {

    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Number, default: 2100 })
    private max!: number

    @Prop({ type: Number, default: 1900 })
    private min!: number

    @Inject()
    private DateStore!: any

    @Emit('pick')
    public handleClick(year: number): void {
        this.DateStore.UPDATE(year, 'year')
    }

    public render(): VNode {

        const { min, max, handleClick } = this
        const { year } = this.DateStore

        const RCols = () => {
            const Cols: any = []

            for (let tempYear = min; tempYear <= max; tempYear ++) {
                const isCurrent = tempYear === year
                Cols.push(<MButton size="sm"
                                   class="m--m-0 m--p-0"
                                   shape="round"
                                   variety={isCurrent ? 'normal' : 'flat'}
                                   color={isCurrent ? 'primary' : 'legacy'}
                                   onClick={() => handleClick(tempYear)} >
                            {tempYear}
                          </MButton>)
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
