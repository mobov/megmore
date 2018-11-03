import { Component, Prop, Emit, Vue, Provide } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color } from '@/types/model'
import TableHead from './components/head'
import TableBody from './components/body'

const prefix = 'm-table'
const keyField = '_table-key'
const selectField = '_table-select'
const expandField = '_table-expand'

@Component({ components: { TableHead, TableBody }})
export default class MTable extends Vue {

    @Prop({ type: Array, default: () => []  })
    private data!: any

    @Prop({ type: String, default: keyField })
    private keyField?: string

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

    @Prop({ type: String, default: 'unset' })
    private header?: 'unset' | 'sticky' | 'none'

    @Prop({ type: String, default: 'none' })
    private hover?: 'none' | 'row' | 'cell'

    @Prop({ type: Boolean, default: false })
    private rowSelect?: boolean

    @Prop({ type: String, default: 'none' })
    private select?: 'none' | 'single' | 'multi'

    @Prop({ type: Array, default: () => [] })
    private selectedData?: any

    @Prop({ type: Array, default: () => [] })
    private noSelectData?: any

    @Prop({ type: Boolean, default: false })
    private rowExpand?: boolean

    @Prop({ type: String, default: 'single' })
    private expand?: 'none' | 'single' | 'multi'

    @Prop({ type: Array, default: () => []  })
    private expandedData?: any

    @Prop({ type: String })
    private filter?: any

    @Prop({ type: String })
    private sort?: any

    private get classes(): any {
        const { border, header, hover } = this
        return {
            [`m--elevation-${this.elevation}`]: true,
            [`m--${this.size}`]: true,
            'm--border': border,
            ['m--sticky-header']: header === 'sticky',
            [`m--${hover}-hover`]: hover !== 'none',
        }
    }

    @Provide()
    public get TableCols(): any {
        const { $slots } = this
        const result: any = []

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
    // 数据输入适配
    private dataAdaptI(data: any): any {
        if (this.keyField === keyField) {
            data.forEach((item: any, index: number) => {
                item[keyField] = index
            })
        }

        return data
    }

    @Provide()
    private TableStore: any = {
        Data: this.dataAdaptI(this.data),
        keyField: this.keyField,
        Selected: this.selectedData,
        NoSelect: this.noSelectData,
        Expanded: this.expandedData,
        SET_DATA(field: string, value: any, index: number = -1): void {
            if (index === -1) {
                this.Data.forEach((row: any) => {
                    if (row[field] !== undefined) {
                        row[field] = value
                    } else {
                        this.$set(row, field, value)
                    }
                })
            } else {
                if (this.Data[index][field] !== undefined) {
                    this.Data[index][field] = value
                } else {
                    console.log(field, value, index)
                    this.$set(this.Data[index], field, value)
                }
            }
        },
        SET_SELECTED(index: number): void {
            const keyValue = this.Data[index][this.keyField]
            const targetIndex = this.Selected.indexOf(keyValue)
            if (targetIndex === -1) {
                this.Selected.push(keyValue)
            } else {
                this.Selected.splice(targetIndex, 1)
            }
        },
        SET_EXPANDED(keyValue: string | number, value: boolean): void {
            return
        },
    }

    @Emit('rowClick')
    private onRowClick(row: any, index: number): void { return }

    @Emit('select')
    private onCheck(row: any, index: number): void { return }

    private render(): VNode {
        const { height, border, header, rowSelect, classes, select, expand } = this
        const noHeader = header === 'none'

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div staticClass={`${prefix}__wrapper`}>
                    { noHeader ? ''
                        : <TableHead ref={'head'} />}
                    <TableBody ref={'body'}
                               height={height}
                               border={border}
                               select={select}
                               expand={expand}
                               rowSelect={rowSelect}
                               noHeader={noHeader} />
                </div>
            </div>
        )
    }
}

