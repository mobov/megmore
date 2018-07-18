import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { isHexColor } from 'es-treasure'
import MSpin from '@/components/spin'
import { Size, Color, Variety, Shape } from '@/types/model'
const name = 'MButton'
const prefix = 'm-button'

@Component({
    name,
    components: { MIcon, MSpin },
})
export default class MButton extends Vue {
    @Prop({ type: String, default: 'md' })
    private size!: Size

    @Prop({ type: String, default: 'default' })
    private type!: Color

    @Prop({ type: String, default: 'normal' })
    private variety!: Variety

    @Prop({ type: String, default: 'square' })
    private shape!: Shape

    @Prop({ type: Boolean })
    private block!: boolean

    @Prop({ type: Boolean })
    private loading!: boolean

    @Prop({ type: Number })
    private elevation!: number

    get classes(): any {
        const isNormal = this.variety === 'normal'
        const isOutline = this.variety === 'outline'
        return {
            [`${this.size}`]: true,
            [`${this.variety}`]: true,
            [`${this.shape}`]: true,
            [`${this.block}`]: this.block,
            [`color-${this.type}`]: !isNormal,
            [`border-${this.type}`]: isOutline,
            [`bg-${this.type}`]: isNormal,
            [`bg-${this.type}--hover`]: isNormal,
            [`elevation-${this.elevation}`]: true,
        }
    }

    @Emit('click')
    public handleClick(e: MouseEvent): void { return void(0) }

    public render(): VNode {
        return (
            <button v-m-ripple staticClass={`${prefix} hover`}
                class={this.classes}
                onClick={this.handleClick}>
                {this.loading && (this.$slots.spinner || <MSpin/>)}
                {this.$slots.default}
            </button>
        )
    }
}
