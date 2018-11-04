import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import MCheckbox from '@/components/checkbox'
import { VNode } from 'vue'
import { toAbsStyleSize } from '@/utils/helpers'

const prefix = 'm-table-head'

@Component({ components: { MCheckbox }})
export default class TableHead extends Vue {
    @Inject()
    private TableCols!: any

    @Inject()
    private TableStore!: any

    private widthMap: any = []
    private updateSize(widthMap: any): void {
        this.widthMap = widthMap
    }
    private handleSelectAll(): void {
        this.TableStore.SET_SELECTED_ALL()
    }
    private RCell(item: any, index: number): VNode {
        const { TableStore, handleSelectAll } = this
        const { Data, keyField, Selected } = TableStore
        const children = item.componentOptions.children
        const propsData = item.componentOptions.propsData
        const propsDefault = item.componentOptions.Ctor.options.props
        const RContent = (): VNode => {
            let content: any = null
            const type = item.data.attrs ? item.data.attrs.type : undefined

            if (type === 'checkbox') {
                const selectedLength = Selected.length
                const dataLength = Data.length

                const checkVal = selectedLength === 0
                    ? []
                    : dataLength === selectedLength
                        ? [0, 1]
                        : [0]
                const checkAll: any = [0, 1]

                content = <MCheckbox onInput={() => { handleSelectAll() }}
                                     value={checkVal}
                                     label={checkAll}/>

            } else if (children) {
                content = children
            } else {
                // todo:错误处理
                content = propsData.title || null
            }

            return content
        }

        const width = toAbsStyleSize(
            this.widthMap[index]
            || propsData.width
            || propsDefault.width.default,
        )
        const align = item.componentOptions.align
            || propsDefault.align.default
        const styles = { width, minWidth: width, maxWidth: width }

        return <td staticClass={`${prefix}__cell`}
                   style={styles}
                   align={align}>{RContent()}</td>
    }
    private RHead(): VNode {
        const { TableCols, RCell } = this
        const result: any = []

        TableCols.forEach((item: any, index: number) => {
            result.push(RCell(item, index))
        })

        return <tr staticClass={`${prefix}__row`}>{result}</tr>
    }
    private RSlotHeadPrepend(): VNode | null {
        const { TableCols } = this
        const $slotHeadPrepend = this.$parent.$slots['head-prepend']

        return $slotHeadPrepend
            ? <tr staticClass={`${prefix}__row`}>
                <td colspan={TableCols.length}>{$slotHeadPrepend}</td>
            </tr> : null
    }
    private RSlotHeadAppend(): VNode | null {
        const { TableCols } = this
        const $slotHeadAppend = this.$parent.$slots['head-append']

        return $slotHeadAppend
            ? <tr staticClass={`${prefix}__row`}>
                <td colspan={TableCols.length}>{$slotHeadAppend}</td>
            </tr> : null
    }
    private RSlotHeadExtra(): any {
        const $slotHeadExtra = this.$parent.$slots['head-extra']

        return $slotHeadExtra ? $slotHeadExtra : null
    }
    private render(): VNode {
        const { RHead, RSlotHeadPrepend, RSlotHeadAppend, RSlotHeadExtra } = this

        return (
            <table staticClass={prefix}>
                <thead>
                    {RSlotHeadPrepend()}
                    {RSlotHeadExtra()}
                    {RHead()}
                    {RSlotHeadAppend()}
                </thead>
            </table>
        )
    }
}
