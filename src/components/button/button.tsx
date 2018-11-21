import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import MSpin from '@/components/spin'
import { Size, Color, Variety, Shape } from '@/types/model'

const prefix = 'm-button'

@Component({ components: { MIcon, MSpin } })
export default class MButton extends Vue {
    @Prop({ type: String, default: 'md' })
    private size!: Size

    @Prop({ type: String, default: 'default' })
    private color!: Color

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
        const { size, color, variety, shape, block, elevation } = this
        const isNormal = this.variety === 'normal'
        const isOutline = this.variety === 'outline'

        return {
            [`m--${size}`]: true,
            [`m--${variety}`]: true,
            [`m--shape-${shape}`]: true,
            ['m--block']: block,
            [`m--color-${color}`]: !isNormal,
            [`m--border-${color}`]: isOutline,
            [`m--bg-${color}`]: isNormal,
            [`m--bg-${color}-hover`]: isNormal,
            [`m--elevation-${elevation}`]: true,
        }
    }

    @Emit('click')
    public handleClick(e: MouseEvent): void { return }

    public render(): VNode {

        return (
            <button v-m-ripple
                staticClass={`${prefix}`}
                class={this.classes}
                onClick={this.handleClick}>
                {this.loading && (this.$slots.spinner || <MSpin />)}
                {this.$slots.default}
            </button>
        )
    }
}
