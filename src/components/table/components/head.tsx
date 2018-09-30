import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import MCheckbox from '@/components/checkbox'
import { VNode } from 'vue'
import { isStyleUnit } from 'es-treasure'

const prefix = 'm-table-head'

@Component
export default class TableHead extends Vue {
    private widthMap: any = []

    @Inject()
    private TableCols!: any

    @Inject()
    private TableData!: any

    private RCell(item: any, index: number): VNode {
        const { TableData } = this
        const RContent = (): VNode => {
            let content: any = null
            const type = item.data.attrs ? item.data.attrs.type : undefined
            const children = item.componentOptions.children
            const field = item.componentOptions.propsData.field
            if (type === 'checkbox') {
                let trueCount = 0
                TableData.forEach((rowData: any) => {
                    if (rowData[field]) { trueCount ++ }
                })
                const checkVal = trueCount === 0 ? [] : trueCount === TableData.length ? [0, 1] : [0]
                const checkAll: any = [0, 1]

                const HandleCheck = () => {
                    if (checkVal.length > 0) {
                        TableData.forEach((rowData: any) => {
                            rowData[field] = false
                        })
                    } else {
                        TableData.forEach((rowData: any) => {
                            rowData[field] = true
                        })
                    }
                }
                content = <MCheckbox nativeOnClick={HandleCheck} value={checkVal} label={checkAll}/>
            } else if (children) {
                content = children
            } else {
                // todo:错误处理
                content = item.data.attrs.title || null
            }

            return content
        }

        let width = this.widthMap[index] ||
            item.componentOptions.propsData.width ||
            item.componentOptions.Ctor.options.props.width.default
        width = isStyleUnit(width) ? width : `${width}px`
        const align = item.componentOptions.align ||
            item.componentOptions.Ctor.options.props.align.default
        const styles = { width, minWidth: width, maxWidth: width }

        return <td style={styles} align={align}>{RContent()}</td>
    }
    private RHead(): VNode {
        const { TableCols, RCell } = this
        const result: any = []

        TableCols.forEach((item: any, index: number) => {
            result.push(RCell(item, index))
        })

        return <tr>{result}</tr>
    }
    private updateSize(widthMap: any): void {
      this.widthMap = widthMap
    }
    private render(): VNode {
        const { $scopedSlots, RHead } = this

        return (
            <table staticClass={prefix}>
                <thead>{RHead()}</thead>
            </table>
        )
    }
}
