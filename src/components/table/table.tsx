import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import THead from './mixins/head'
import TBody from './mixins/body'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color } from '@/types/model'

const prefix = 'm-table'

@Component({ components: { MIcon } })
export default class MTable extends mixins(THead, TBody) {

    @Prop({ type: Array, default: [] })
    public data!: any

    @Prop({ type: Number, default: 1 })
    private elevation!: number

    @Prop({ type: String, default: 'md' })
    private size!: string

    private render(): VNode {
        const { RTHead, RTBody } = this

        const classes = {
            [`m--elevation-${this.elevation}`]: true,
            [`m--${this.size}`]: true,
        }

        return (
            <div staticClass={`${prefix}`} class={classes}>
                {RTHead()}
                {RTBody()}
            </div>
        )
    }
}
