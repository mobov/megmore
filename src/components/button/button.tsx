import { Component, Prop, Vue } from 'vue-property-decorator'
import MIcon from '../icon'
import { VNode } from 'vue'
import { isHexColor, isStyleUnit } from 'es-treasure'

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

    public render(): VNode {

        return (
            <button staticClass={prefix}
                v-m-ripple
                class={`${this.size} ${this.type} ${this.round ? 'round' : ''}`}
                onClick={this.handleClick}
            >
                {this.$slots.default}
            </button>
        )
    }

    private handleClick(e: MouseEvent) {
        this.$emit('click', e)
    }
}
