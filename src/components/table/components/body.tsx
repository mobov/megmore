import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import MCheckbox from '@/components/checkbox'
import MRadio from '@/components/radio'
import { VNode } from 'vue'
import { on, off } from '@/utils/event'
import { getScrollbarSize } from '@/utils/dom'
import { isStyleUnit } from 'es-treasure'

const prefix = 'm-table-body'

@Component({ components: { MCheckbox, MRadio }})
export default class TableBody extends Vue {
    @Prop({ type: String })
    private height!: string

    @Prop({ type: Boolean })
    private border!: boolean

    @Prop({ type: Boolean })
    private rowCheck!: boolean

    @Prop({ type: String })
    private checkField?: string

    @Inject()
    private TableData!: any

    @Inject()
    private TableCols!: any

    @Inject()
    private updateTableRow!: any

    get isScrollY(): boolean {
        return this.height !== 'auto'
    }

    private handleRowClick(item: any, index: number): void {
        const { rowCheck, checkField } = this

        if (rowCheck) {
            this.onCheck(checkField, item[checkField], index)
        }
    }

    @Emit('check')
    private onCheck(field: string, value: any, index: number): void {
        this.updateTableRow(field, !value, index)
    }



    private RCols(data: any, index: number): VNode {
        const { TableCols, onCheck, checkField } = this
        const result: any = []

        const RContent = (item: any): VNode => {
            let content: any = []
            // todo:错误处理
            const type = item.data.attrs ? item.data.attrs.type : undefined
            const children = item.componentOptions.children
            const field = item.componentOptions.propsData.field

            if (type === 'radio') {
                const value = !!data[checkField]
                content = <MRadio value={value} />
            } else if (type === 'checkbox') {
                const value = !!data[checkField]
                content = <MCheckbox value={value}
                                     onInput={(value: any) => onCheck(checkField, value, index)} />
            } else if (children) {
                content = children
            } else {
                content = data[field]
            }

            return content
        }

        const RCell = (item: any): VNode => {
            const width = item.componentOptions.propsData.width ||
                item.componentOptions.Ctor.options.props.width.default
            const align = item.componentOptions.align ||
                item.componentOptions.Ctor.options.props.align.default
            const styles = { width, minWidth: width, maxWidth: width }

            return <td staticClass={`${prefix}__cell`}
                       width={width}
                       align={align}
                       style={styles}>
                      {RContent(item)}
                   </td>
        }

        TableCols.forEach((item: any) => { result.push(RCell(item)) })

        return result
    }
    private RRows(): VNode {
        const { TableData, RCols, handleRowClick } = this
        const result: any = []

        TableData.forEach((item: any, index: number) => {
            result.push(<tr staticClass={`${prefix}__row`}
                            onClick={() => handleRowClick(item, index)}>
                            {RCols(item, index)}
                        </tr>)
        })

        return result
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
    private onDomUpdate(): void {
        const { isScrollY, border } = this
        const $tableBody: any = this.$el.querySelector('tbody')

        if (!!$tableBody.children.length) {
            const widthMap: any = []
            const $headCells: any = $tableBody.children[0].children
            const vmTableHead: any = this.$parent.$children[0]
            let cellCount = $headCells.length
            while (cellCount --) {
                widthMap.unshift($headCells[cellCount].clientWidth + (border ? 1 : 0)) // +1px消去边框对宽度影响
            }

            if (isScrollY && widthMap.length > 1) {
                widthMap[widthMap.length - 1] += getScrollbarSize(this.$el)
            }
            vmTableHead.updateSize(widthMap)
        }
    }

    private render(): VNode {
        const { $scopedSlots, isScrollY, height, RRows, TableData,
                handleRowClick } = this
        const styles = {
            ['height']: isScrollY ? height : false,
        }

        return (
            <div staticClass={prefix} style={styles}>
                <table>
                    <tbody>{RRows()}</tbody>
                </table>
            </div>
        )
    }
}
