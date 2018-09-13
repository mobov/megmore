import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import MCheckbox from '@/components/checkbox'
import MRadio from '@/components/radio'
import { VNode } from 'vue'
import { on, off } from '@/utils/event'
import { getScrollbarSize } from '@/utils/dom'

const prefix = 'm-table-body'

@Component({ components: { MCheckbox, MRadio }})
export default class TableBody extends Vue {
    @Prop({ type: String })
    public height!: string

    @Prop({ type: Boolean })
    public border!: boolean

    @Inject()
    public TableData!: any

    @Inject()
    public TableCols!: any

    get isScrollY(): boolean {
        return this.height !== 'auto'
    }

    private RCols(data: any): VNode {
        const { TableCols } = this
        const result: any = []

        const RContent = (item: any): VNode => {
            let content: any = []
            const type = item.data.attrs ? item.data.attrs.type : undefined
            const children = item.componentOptions.children

            if (type === 'radio') {
                content = <MRadio />
            } else if (type === 'checkbox') {
                content = <MCheckbox />
            } else if (children) {
                content = children
            } else {
                // todo:错误处理
                content = data[item.componentOptions.propsData.field]
            }

            return content
        }

        const RCell = (item: any): VNode => {
            const width = item.componentOptions.propsData.width ||
                item.componentOptions.Ctor.options.props.width.default
            return <td width={width}>{RContent(item)}</td>
        }

        TableCols.forEach((item: any) => { result.push(RCell(item)) })

        return result
    }
    private RRows(): VNode {
        const { TableData, RCols } = this
        const result: any = []

        TableData.forEach((item: any) => { result.push(<tr>{RCols(item)}</tr>) })

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

        console.log(border)
        if ($tableBody.children && $tableBody.children.length) {
            const widthMap: any = []
            const $headCells: any = $tableBody.children[0].children
            const vmTableHead: any = this.$parent.$children[0]
            let cellCount = $headCells.length
            while (cellCount --) {
                widthMap.unshift($headCells[cellCount].clientWidth + (border ? 1 : 0)) // +1px消去边框对宽度影响
            }
            console.log(isScrollY)
            console.log(widthMap)
            if (isScrollY && widthMap.length > 1) {
                widthMap[widthMap.length - 1] += getScrollbarSize(this.$el)
            }
            vmTableHead.updateSize(widthMap)
        }
    }

    private render(): VNode {
        const { $scopedSlots, isScrollY, height, RRows, TableData } = this
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
