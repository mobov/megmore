import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import MCheckbox from '@/components/checkbox'
import MRadio from '@/components/radio'
import { VNode } from 'vue'

const prefix = 'm-table-body'

@Component({ components: { MCheckbox, MRadio }})
export default class TableBody extends Vue {
    @Prop({ type: String })
    public height!: string
    @Inject()
    public TableData!: any
    @Inject()
    public TableCols!: any

    private RShadowHead(): VNode {
        const { TableCols } = this
        const result: any = []

        const RCell = (item: any): VNode => {
            const RContent = (): VNode => {
                let content: any = null
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
                    content = item.data.attrs.title
                }

                return content
            }
            const width = item.componentOptions.propsData.width ||
                item.componentOptions.Ctor.options.props.width.default

            return <td width={width}>{RContent()}</td>
        }
        TableCols.forEach((item: any) => {
            result.push(RCell(item))
        })
        return (
            <thead>{result}</thead>
        )
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
    }
    private updated(): void {
        this.onDomUpdate()
    }
    private onDomUpdate(): void {
        const widthMap: any = []
        const $headCells = this.$el.children[0].children
        const vmTableHead = this.$parent.$children[0]
        let cellCount = $headCells.length
        while (cellCount --) {
            widthMap.unshift($headCells[cellCount].clientWidth)
        }
        vmTableHead.updateSize(widthMap)
    }
    private render(): VNode {
        const { $scopedSlots, height, RShadowHead, RRows, TableData } = this
        console.log(TableData)
        return (
            <table staticClass={prefix}>
                {RShadowHead()}
                <tbody>{RRows()}</tbody>
            </table>
        )
    }
}
