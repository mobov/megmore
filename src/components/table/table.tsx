import { Component, Prop, Emit, Vue, Provide } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color, DateValueType, DatePickerType } from '@/types/model'
import TableHead from './components/head'
import TableBody from './components/body'

const prefix = 'm-table'

@Component({ components: { TableHead }})
export default class MTable extends Vue {

    @Prop({ type: Array, default: [] })
    public data!: any

    @Prop({ type: String, default: 'primary' })
    public color?: Color

    @Prop({ type: Number, default: 2 })
    public elevation?: number

    @Prop({ type: String, default: 'md' })
    public size?: Size

    @Prop({ type: [String, Number], default: 'auto' })
    public height?: string | number

    @Prop({ type: Boolean, default: false })
    public border?: boolean

    @Prop({ type: Boolean, default: false })
    public noHeader?: boolean

    @Prop({ type: Boolean, default: false })
    public rowCheck?: boolean

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

    @Provide()
    public updateTableRow(field: string, value: any, index: number = -1): void {
        if (index === -1) {
            this.TableData.forEach((row: any) => {
                if (row[field] !== undefined) {
                    row[field] = value
                } else {
                    this.$set(row[field], field, value)
                }
            })
        } else {
            if (this.TableData[index][field] !== undefined) {
                this.TableData[index][field] = value
            } else {
                this.$set(this.TableData[index], field, value)
            }
        }
    }

    private render(): VNode {
        const { height, border, noHeader, rowCheck } = this
        const classes = {
            [`m--elevation-${this.elevation}`]: true,
            [`m--${this.size}`]: true,
            'm--border': border,
            'm--scroll-y': height !== 'auto ',
        }

        return (
            <div staticClass={`${prefix}`} class={classes}>
                { noHeader ? '' : <TableHead />}
                <TableBody height={height} border={border} rowCheck={rowCheck} />
            </div>
        )
    }
}

