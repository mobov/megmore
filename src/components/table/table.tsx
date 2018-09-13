import { Component, Prop, Emit, Vue, Provide } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import {Size, Color, DateValueType, DatePickerType} from '@/types/model'
import TableHead from './components/head'
import TableBody from './components/body'

const prefix = 'm-table'

@Component({ components: { TableHead }})
export default class MTable extends Vue {

    @Prop({ type: Array, default: [] })
    public data!: any

    @Prop({ type: Number, default: 1 })
    public elevation!: number

    @Prop({ type: String, default: 'md' })
    public size!: Size

    @Prop({ type: [String, Number], default: 'auto' })
    public height?: string | number

    @Prop({ type: Boolean, default: false })
    public border?: boolean

    @Provide()
    public TableData: any = this.data

    @Provide()
    public get TableCols(): any {
        const { $slots } = this
        const result: any = []
        // 声明渲染
        $slots.default.forEach((item: any) => {
            result.push(item)
        })

        return result
    }
    private render(): VNode {
        const { height, border } = this
        const classes = {
            [`m--elevation-${this.elevation}`]: true,
            [`m--${this.size}`]: true,
            'm--border': border,
            'm--scroll-y': height !== 'auto ',
        }

        console.log(height)

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <TableHead />
                <TableBody height={height} />
            </div>
        )
    }
}

