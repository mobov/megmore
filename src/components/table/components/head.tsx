import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'


@Component
export default class TableHead extends Vue {
    @Inject() TableData!: any

    private get headers(): any{
        return [1,2,3,4,5]
    }
    private RTds(): VNode {
        const { headers } = this
        const result: any = []

        headers.forEach((item: any) =>{
            result.push(<td>{item}</td>)
        })

        return result
    }

    public render(): VNode {

        const { data, $scopedSlots, RTds } = this
        return (
            <table>
                <thead>
                    <tr>
                        {RTds()}
                        {/*{$scopedSlots.default(item)}*/}
                    </tr>
                </thead>
            </table>
        )
    }
}
