import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'

@Component
export default class THead extends Vue {
    public RTHead (): VNode {
        return (
            <table>
                <thead>
                    <tr>
                        <td>呵呵</td>
                        <td>呵呵</td>
                        <td>呵呵</td>
                        <td>呵呵</td>
                    </tr>
                </thead>
            </table>
        )
    }
}
