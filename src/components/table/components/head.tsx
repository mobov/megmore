import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'


@Component
export default class TableHead extends Vue {
    @Inject() TableCols!: any

    private RHead(): VNode {
        const { TableCols } = this
        const result: any = []

        TableCols.forEach((item: any) => {
            const width = item.componentOptions.propsData.width ||
                item.componentOptions.Ctor.options.props.width.default
            result.push(<td width={width}>{item.data.attrs.title}</td>)
        })

        return <tr>{result}</tr>
    }

    public render(): VNode {

        const { $scopedSlots, RHead } = this

        return (
            <table>
                <thead>{RHead()}</thead>
            </table>
        )
    }
}
