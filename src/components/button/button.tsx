import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '../icon'
import { VNode } from 'vue'
import { isHexColor } from 'es-treasure'
import MSpin from '../spin'
import { Model } from '@/types'
const name = 'MButton'
const prefix = 'm-button'

@Component({
    name,
    components: { MIcon, MSpin },
})
export default class MButton extends Vue {
    @Prop({ type: String, default: 'md' })
    private size!: Model.Size

    @Prop({ type: String, default: 'default' })
    private color!: Model.Color

    @Prop({ type: String, default: 'normal' })
    private type!: Model.ButtonType

    @Prop({ type: String, default: 'square' })
    private shape!: Model.Shape

    @Prop({ type: Boolean })
    private round!: boolean

    @Prop({ type: Boolean })
    private block!: boolean

    @Prop({ type: Boolean })
    private loading!: boolean

    @Prop({ type: Number })
    private elevation!: number

    get classes(): any {
        const classes = {
            [`${this.size}`]: true,
            [`${this.type}`]: true,
            [`${this.shape}`]: true,
            [`color-${this.color}`]: this.type !== 'normal' && !isHexColor(this.color),
            [`bg-${this.color}`]: this.type === 'normal' && !isHexColor(this.color),
            [`border-${this.color}`]: this.type === 'outline' && !isHexColor(this.color),
            [`elevation-${this.elevation}`]: this.elevation,
        }
        return classes
    }

    @Emit('click')
    public handleClick(e: MouseEvent): void { return void(0) }

    public render(): VNode {
        return (
            <button v-m-ripple staticClass={prefix}
                class={this.classes}
                onClick={this.handleClick}
            >
                {this.loading && (this.$slots.spinner || <m-spin ></m-spin>)}
                <span>{this.$slots.default}</span>
            </button>
        )
    }
}
