import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color } from '@/types/model'

const prefix = 'm-table-column'

@Component({ components: { MIcon } })
export default class MTableColumn extends Vue {

    @Prop({ type: Array, default: [] })
    public data!: any

    @Prop({ type: Array, default: [] })
    public columns!: any

    @Prop({ type: Number, default: 1 })
    private elevation!: number

    @Prop({ type: String, default: 'md' })
    private size!: string

    private render(): VNode {

        return (
            <div staticClass={`${prefix}`} class={classes}>

            </div>
        )
    }
}

