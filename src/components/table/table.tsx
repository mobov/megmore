import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color } from '@/types/model'

const prefix = 'm-table'

@Component({ components: { MIcon } })
export default class MTable extends Vue {

    @Prop({ type: [Boolean, Number, String], default: false })
    private value!: boolean | number | string

    @Prop({ type: Number, default: 2 })
    private elevation!: number

    @Prop({ type: String, default: 'md' })
    private size!: string

    private render(): VNode {
        const classes = {
            [`m--elevation-${this.elevation}`]: true,
            [`m--${this.size}`]: true,
        }

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <table>
                    <thead>
                        <tr>
                            <td>呵呵</td>
                            <td>呵呵</td>
                            <td>呵呵</td>
                            <td>呵呵</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>呵呵</td>
                            <td>呵呵</td>
                            <td>呵呵</td>
                            <td>呵呵</td>
                        </tr>
                        <tr>
                            <td>呵呵</td>
                            <td>呵呵</td>
                            <td>呵呵</td>
                            <td>呵呵</td>
                        </tr>
                        <tr>
                            <td>呵呵</td>
                            <td>呵呵</td>
                            <td>呵呵</td>
                            <td>呵呵</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
