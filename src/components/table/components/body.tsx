import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import MCheckbox from '@/components/checkbox'
import MRadio from '@/components/radio'
import { VNode } from 'vue'

@Component({ components: { MCheckbox, MRadio }})
export default class TableBody extends Vue {
    @Inject() TableData!: any
    @Inject() TableCols!: any


    private RCols(data: any): VNode{
        console.log(data)
        const { TableCols } = this
        const result: any = []
        const RContent = (item: any): VNode => {
            let _node: any = []
            const type = item.data.attrs ? item.data.attrs.type : undefined
            const children = item.componentOptions.children

            if(type === 'radio'){
                _node = <MRadio />
            } else if(type === 'checkbox'){
                _node = <MCheckbox />
            } else if(children){
                _node = children
            } else {
                // todo:错误处理
                _node = data[item.componentOptions.propsData.field]
            }

            return _node
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

    public render(): VNode {
        const { data, $scopedSlots, RRows, TableData } = this
        console.log(TableData)
        return (
            <table>
                <tbody>
                    {RRows()}
                </tbody>
            </table>
        )
    }
}
