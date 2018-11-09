import { Component, Prop, Emit, Vue, Provide, Watch } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { deepCopy } from '@megmore/es-helper'
import { Size, Color } from '@/types/model'
import TableHead from './components/head'
import TableBody from './components/body'
import {watch} from "fs";

const prefix = 'm-table'
const selfKeyField = '_table-key'
const selfSelectField = '_table-select'
const selfExpandField = '_table-expand'

@Component({ components: { TableHead, TableBody }})
export default class MTable extends Vue {

    @Prop({ type: Array, default: () => []  })
    private data!: any

    @Prop({ type: String, default: selfKeyField })
    private keyField?: string

    @Prop({ type: String, default: 'primary' })
    private color?: Color

    @Prop({ type: Number, default: 2 })
    private elevation?: number

    @Prop({ type: String, default: () => 'md' })
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

    @Prop({ type: [Array, String, Number], default: () => [] })
    private selected?: any | string | number

    @Prop({ type: Array, default: () => [] })
    private noSelect?: any

    @Prop({ type: Boolean, default: false })
    private rowExpand?: boolean

    @Prop({ type: String, default: 'single' })
    private expand?: 'none' | 'single' | 'multi'

    @Prop({ type: [Array, String, Number], default: () => []  })
    private expanded?: any | string | number

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
    // 数据输入适配
    private dataAdaptI(val: any): any {
        const { keyField } = this
        const temp = deepCopy(val)
        if (keyField === selfKeyField) {
            temp.forEach((item: any, index: number) => {
                item[keyField] = index
            })
        }

        return temp
    }
    @Watch('data', { immediate: true, deep: true })
    private handleDataUpdate(val: any): void {
        this.TableStore.Data = this.dataAdaptI(val)
    }
    @Watch('selected', { immediate: true })
    private handleSelectedUpdate(val: any): void {
        this.TableStore.Selected = deepCopy(val)
    }
    @Watch('expanded', { immediate: true })
    private handleExpandedUpdate(val: any): void {
        this.TableStore.Expanded = deepCopy(val)
    }

    @Emit('update:selected')
    private syncSelected(data: any): void { return void(0) }

    @Emit('update:expanded')
    private syncExpanded(data: any): void { return void(0) }

    @Emit('expand')
    private onExpand(row: any, index: number): void { return void(0) }

    @Emit('expandAll')
    private onExpandAll(row: any, index: number): void { return void(0) }

    @Emit('select')
    private onSelect(row: any, index: number): void { return void(0) }

    @Emit('selectAll')
    private onSelectAll(row: any, index: number): void { return void(0) }

    @Emit('rowClick')
    private onRowClick(row: any, index: number): void { return void(0) }

    @Emit('rowDblclick')
    private onRowDblclick(row: any, index: number): void { return void(0) }

    @Provide()
    private TableStore: any = {
        Data: [],
        keyField: this.keyField,
        Selected: [],
        NoSelect: this.noSelect,
        Expanded: [],
        SET_DATA(field: string, value: any, index: number = -1): void {
            const { Data } = this

            if (index === -1) {
                Data.forEach((row: any) => {
                    if (row[field] !== undefined) {
                        row[field] = value
                    } else {
                        this.$set(row, field, value)
                    }
                })
            } else {
                if (Data[index][field] !== undefined) {
                    Data[index][field] = value
                } else {
                    console.log(field, value, index)
                    //this.$set(Data[index], field, value)
                }
            }
        },
        SET_SELECTED: (index: number): void => {
            const { select } = this
            const { Data, Selected, keyField } = this.TableStore
            const keyValue = Data[index][keyField]
            const targetIndex = Selected.indexOf(keyValue)

            if (targetIndex === -1) {
                if (select === 'multi') {
                    // multi
                    this.TableStore.Selected.push(keyValue)
                } else {
                    // single
                    this.TableStore.Selected = [keyValue]
                }
            } else {
                this.TableStore.Selected.splice(targetIndex, 1)
            }
            this.syncSelected(this.TableStore.Selected)
        },
        SET_SELECTED_ALL: (): void => {
            const { Data, Selected, keyField } = this.TableStore
            if (Selected.length === 0) {
                this.TableStore.Selected = Data.map((row: any) => row[keyField])
            } else {
                this.TableStore.Selected = []
            }
            this.syncSelected(this.TableStore.Selected)
        },
        SET_EXPANDED: (index: number): void => {
            const { expand } = this
            const { Data, keyField } = this.TableStore
            const keyValue = Data[index][keyField]
            const targetIndex = this.TableStore.Expanded.indexOf(keyValue)

            if (targetIndex === -1) {
                if (expand === 'single') {
                    this.TableStore.Expanded = [keyValue]
                } else {
                    this.TableStore.Expanded.push(keyValue)
                }
            } else {
                this.TableStore.Expanded.splice(targetIndex, 1)
            }
            this.syncExpanded(this.TableStore.Expanded)
        },
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

    private render(): VNode {
        const { height, border, header, classes, size, select, expand, rowSelect, rowExpand } = this
        const noHeader = header === 'none'

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div staticClass={`${prefix}__wrapper`}>
                    { noHeader ? undefined :
                        <TableHead ref={'head'}
                                   size={size}
                                   select={select}/>
                    }
                    <TableBody ref={'body'}
                               size={size}
                               height={height}
                               border={border}
                               select={select}
                               expand={expand}
                               rowSelect={rowSelect}
                               rowExpand={rowExpand}
                               noHeader={noHeader} />
                </div>
            </div>
        )
    }
}

