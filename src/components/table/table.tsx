import { Component, Prop, Emit, Vue, Provide } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color, DateValueType, DatePickerType } from '@/types/model'
import TableHead from './components/head'
import TableBody from './components/body'
import { prefix as tableColTagName } from './table-column'

const prefix = 'm-table'

@Component({ components: { TableHead }})
export default class MTable extends Vue {

    @Prop({ type: Array, default: [] })
    private data!: any

    @Prop({ type: String, default: 'primary' })
    private color?: Color

    @Prop({ type: Number, default: 2 })
    private elevation?: number

    @Prop({ type: String, default: 'md' })
    private size?: Size

    @Prop({ type: [String, Number], default: 'auto' })
    private height?: string | number

    @Prop({ type: Boolean, default: false })
    private border?: boolean

    @Prop({ type: Boolean, default: false })
    private noHeader?: boolean

    @Prop({ type: Boolean, default: false })
    private stickyHeader?: boolean

    @Prop({ type: Boolean, default: false })
    private rowCheck?: boolean

    @Prop({ type: Boolean, default: false })
    private rowHover?: boolean

    @Prop({ type: Boolean, default: false })
    private cellHover?: boolean

    @Prop({ type: String })
    private checkField?: string

    @Provide()
    public TableData: any = this.data

    @Provide()
    public get TableCols(): any {
        const { $slots } = this
        const result: any = []
        console.log($slots)
        // 声明渲染
        $slots.default.forEach((item: any) => {
            // 多级表头处理
            // const $children = item.componentOptions.children
            // if (
            //     $children
            //     && $children.length > 1
            //     && $children[0].componentOptions.tag === tableColTagName
            // ) {
            //     console.log(item.componentOptions.children[0].componentOptions.tag)
            //     console.log(tableColTagName)
            // }
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
                    this.$set(row, field, value)
                }
            })
        } else {
            if (this.TableData[index][field] !== undefined) {
                this.TableData[index][field] = value
            } else {
                console.log(field, value, index)
                this.$set(this.TableData[index], field, value)
            }
        }
    }

    @Emit('rowClick')
    private onRowClick(row: any, index: number): void { return }

    @Emit('check')
    private onCheck(row: any, index: number): void { return }

    private render(): VNode {
        const { height, border, noHeader, stickyHeader, rowCheck, checkField,
                onRowClick, onCheck, rowHover, cellHover } = this
        const classes = {
            [`m--elevation-${this.elevation}`]: true,
            [`m--${this.size}`]: true,
            'm--border': border,
            'm--sticky-header': stickyHeader,
            'm--row-hover': rowHover,
            'm--cell-hover': cellHover,
        }

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div staticClass={`${prefix}__wrapper`}>
                    { noHeader ? ''
                        : <TableHead ref={'head'}
                                     checkField={checkField} />}
                    <TableBody ref={'body'}
                               height={height}
                               border={border}
                               rowCheck={rowCheck}
                               noHeader={noHeader}
                               checkField={checkField} />
                </div>
            </div>
        )
    }
}

