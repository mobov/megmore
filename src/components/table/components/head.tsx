import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import MCheckbox from '@/components/checkbox'
import { VNode } from 'vue'
import { isStyleUnit } from 'es-treasure'
import { mixins } from 'vue-class-component'
import TableBase from "@/components/table/mixins";

const prefix = 'm-table-head'

@Component({ components: { MCheckbox }})
export default class TableHead extends  mixins(TableBase) {
    private widthMap: any = []
    private updateSize(widthMap: any): void {
        this.widthMap = widthMap
    }
    private RCell(item: any, index: number): VNode {
        const { TableData, checkField } = this
        const children = item.componentOptions.children
        const propsData = item.componentOptions.propsData
        const propsDefault = item.componentOptions.Ctor.options.props
        const RContent = (): VNode => {
            let content: any = null
            const type = item.data.attrs ? item.data.attrs.type : undefined

            // const field = item.componentOptions.propsData.field
            if (type === 'checkbox') {
                let trueCount = 0
                TableData.forEach((rowData: any) => {
                    if (rowData[checkField]) { trueCount ++ }
                })
                const checkVal = trueCount === 0
                    ? []
                    : trueCount === TableData.length
                        ? [0, 1]
                        : [0]
                const checkAll: any = [0, 1]

                const HandleCheck = () => {
                    if (checkVal.length > 0) {
                        TableData.forEach((rowData: any) => {
                            rowData[checkField] = false
                        })
                    } else {
                        TableData.forEach((rowData: any) => {
                            rowData[checkField] = true
                        })
                    }
                }
                content = <MCheckbox nativeOnClick={HandleCheck}
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

        let width = this.widthMap[index]
            || propsData.width
            || propsDefault.width.default
        width = isStyleUnit(width) ? width : `${width}px`
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
    private RSlotHeadPre(): any {
        const { TableCols } = this
        const $slotHeadPre = this.$parent.$slots['head-pre']

        return $slotHeadPre
            ? <tr staticClass={`${prefix}__row`}>
                <td colspan={TableCols.length}>{$slotHeadPre}</td>
              </tr>
            : null
    }
    private RSlotHeadSuf(): any {
        const { TableCols } = this
        const $slotHeadSuf = this.$parent.$slots['head-suf']

        return $slotHeadSuf
            ? <tr staticClass={`${prefix}__row`}>
                <td colspan={TableCols.length}>{$slotHeadSuf}</td>
            </tr>
            : null
    }
    private RSlotHeadCom(): any {
        const $slotHeadCom = this.$parent.$slots['head-com']

        return $slotHeadCom
            ? $slotHeadCom
            : null
    }
    private render(): VNode {
        const { RHead, RSlotHeadPre, RSlotHeadSuf, RSlotHeadCom } = this

        return (
            <table staticClass={prefix}>
                <thead>
                    {RSlotHeadPre()}
                    {RSlotHeadCom()}
                    {RHead()}
                    {RSlotHeadSuf()}
                </thead>
            </table>
        )
    }
}
