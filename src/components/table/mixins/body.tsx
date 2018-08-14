import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'


@Component
export default class TBody extends Vue {
    public RTBody (): VNode {
        const { data, $scopedSlots } = this

        const RTds = ()=>{
            const result: any = []
            data.forEach(item => {
                result.push(<tr>{$scopedSlots.default(item)}</tr>)
            })

            return result
        }

        return (
            <table>
                <tbody>{RTds()}</tbody>
            </table>
        )
    }
}
