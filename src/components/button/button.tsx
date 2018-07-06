import { Component, Prop, Vue } from 'vue-property-decorator'
import MIcon from '../icon'
import { VNode } from 'vue'
import MSpin from '../spin'
const name = 'MButton'
const prefix = 'm-button'

@Component({
    name,
    components: { MIcon },
})
export default class MButton extends Vue {
    @Prop({
        type: String,
        default: 'md',
    })
    private size!: any

    @Prop({
        type: String,
        default: 'default',
    })
    private type!: any

    @Prop({
        type: Boolean,
    })
    private round = false

    @Prop({
        type: Boolean,
    })
    private loading!: boolean

    public render(): VNode {
        return (
            <button staticClass={prefix}
                v-m-ripple
                class={`${this.size} ${prefix}--${this.type} bg--${this.type}  color--${this.type} ${this.round ? (prefix + '--round') : ''}`}
                onClick={this.handleClick}
            >
                {this.loading && <m-spin ></m-spin>}
                <span>{this.$slots.default}</span>
            </button>
        )
    }

    private handleClick(e: MouseEvent) {
        this.$emit('click', e)
    }
}
