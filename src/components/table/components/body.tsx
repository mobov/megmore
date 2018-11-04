import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import MCheckbox from '@/components/checkbox'
import MRadio from '@/components/radio'
import { VNode, VNodeChildren } from 'vue'
import { toAbsStyleSize } from '@/utils/helpers'
import { on, off } from '@/utils/event'

const prefix = 'm-table-body'

@Component({ components: { MCheckbox, MRadio }})
export default class TableBody extends Vue {
    @Prop({ type: String })
    private height!: string

    @Prop({ type: Boolean })
    private border!: boolean

    @Prop({ type: Boolean })
    private rowSelect!: boolean

    @Prop({ type: Boolean })
    private noHeader!: boolean

    @Prop({ type: String})
    private select!: 'none' | 'single' | 'multi'

    @Prop({ type: String})
    private expand!: 'none' | 'single' | 'multi'

    @Inject()
    private TableCols!: any

    @Inject()
    private TableStore!: any

    private get selectable(): boolean {
        return this.select !== 'none'
    }
    private get expandable(): boolean {
        return this.expand !== 'none'
    }
    private get styles(): any {
        const { height } = this

        return {
            height: height !== 'auto' ? height : false,
        }
    }

    private handleRowClick(row: any, index: number): void {
        const { selectable } = this

        if (selectable) {
            this.handleRowSelect(row, index)
        }
    }
    private handleRowSelect(row: any, index: number): void {
        this.TableStore.SET_SELECTED(index)
    }
    private RCols(row: any, index: number, isSelected: boolean): VNode {
        const { TableCols, selectable, handleRowSelect } = this
        const result: any = []

        const RContent = (item: any): VNode => {
            let content: any = []
            // todo:错误处理
            const type = item.data.attrs ? item.data.attrs.type : undefined
            const scopedSlots = item.data.scopedSlots
            const field = item.componentOptions.propsData.field

            if (type === 'radio' && selectable) {
                content = <MRadio value={isSelected}
                                  nativeOnClick={(event: Event) => { event.stopPropagation()}}
                                  onInput={() => handleRowSelect(row, index)} />
            } else if (type === 'checkbox' && selectable) {
                content = <MCheckbox value={isSelected}
                                     nativeOnClick={(event: Event) => { event.stopPropagation()}}
                                     onInput={() => handleRowSelect(row, index)} />
            } else if (scopedSlots) {
                // 自定模板
                content = scopedSlots.default(row)
            } else {
                content = row[field]
            }

            return content
        }

        const RCell = (item: any): VNode => {
            const width = toAbsStyleSize(
                item.componentOptions.propsData.width,
            )

            const styles = {
                width,
                minWidth: width,
                maxWidth: width,
            }
            const align = item.componentOptions.align
                || item.componentOptions.Ctor.options.props.align.default

            return <td staticClass={`${prefix}__cell`}
                       style={styles}
                       align={align}>
                      {RContent(item)}
                   </td>
        }

        TableCols.forEach((item: any) => { result.push(RCell(item)) })

        return result
    }
    private RRow(row: any, index: number): VNode {
        const { TableStore, RCols, handleRowClick, selectable } = this
        const { Selected, keyField } = TableStore
        const isSelected = Selected.includes(row[keyField])
        const classes = {
            'm--selected': selectable ? isSelected : false,
        }

        return  <tr staticClass={`${prefix}__row`}
                    class={classes}
                    onClick={() => handleRowClick(row, index)}>
                    {RCols(row, index, isSelected)}
                </tr>
    }
    private RExpand(row: any, index: number): VNode | null {
        if (!this.$parent.$scopedSlots.expand) { return null }

        const { TableStore, TableCols } = this
        const { keyField } = TableStore

        return  <tr staticClass={`${prefix}__expand`}
                    key={keyField}>
                    <td colspan={TableCols.length}>
                        {this.$parent.$scopedSlots.expand(row)}
                    </td>
                </tr>
    }
    private RTBody(): VNode {
        const { TableStore, RRow, RExpand, expandable } = this
        const result: any = []

        TableStore.Data.forEach((row: any, index: number) => {
            result.push(RRow(row, index))
            if (expandable) {
                result.push(RExpand(row, index))
            }
        })

        return <tbody>{result}</tbody>
    }
    private onDomUpdate(): void {
        const { noHeader, border } = this
        const $tableBody: any = this.$el.querySelector('tbody')

        if (!!$tableBody.children.length && !noHeader) {
            const widthMap: any = []
            const $headCells: any = $tableBody.children[0].children
            const vmTableHead: any = this.$parent.$refs.head
            let cellCount = $headCells.length
            while (cellCount --) {
                widthMap.unshift($headCells[cellCount].clientWidth + (border ? 1 : 0)) // +1px消去边框对宽度影响
            }

            vmTableHead.updateSize(widthMap)
        }
    }
    private mounted(): void {
        this.onDomUpdate()
        on(window, 'resize', this.onDomUpdate)
    }
    private updated(): void {
        this.onDomUpdate()
    }
    private beforeDestroy(): void {
        off(window, 'resize', this.onDomUpdate)
    }
    private render(): VNode {

        const { styles, RTBody } = this

        return  <div staticClass={prefix} style={styles}>
                    <table>{RTBody()}</table>
                </div>
    }
}

