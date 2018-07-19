import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { isHexColor } from 'es-treasure'
import MSpin from '@/components/spin'
import { Size, Color, Variety, Shape } from '@/types/model'

const prefix = 'm-button'

@Component({ components: { MIcon, MSpin } })
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

    @Prop({ type: Number, default: 0 })
    private elevation!: number

    get classes(): any {
        const isNormal = this.variety === 'normal'
        const isOutline = this.variety === 'outline'
        return {
            [`m--${this.size}`]: true,
            [`m--${this.variety}`]: true,
            [`m--${this.shape}`]: true,
            [`m--${this.block}`]: this.block,
            [`m--color-${this.type}`]: !isNormal,
            [`m--border-${this.type}`]: isOutline,
            [`m--bg-${this.type}`]: isNormal,
            [`m--bg-${this.type}-hover`]: isNormal,
            [`m--elevation-${this.elevation}`]: true,
        }
    }

    @Emit('click')
    public handleClick(e: MouseEvent): void { void(0) }

    public render(): VNode {
        return (
            <button v-m-ripple
                staticClass={`${prefix}`}
                class={this.classes}
                onClick={this.handleClick}>
                {this.loading && (this.$slots.spinner || <MSpin/>)}
                {this.$slots.default}
            </button>
        )
    }
}
