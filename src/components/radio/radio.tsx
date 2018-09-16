import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color } from '@/types/model'

const prefix = 'm-radio'

@Component({ components: { MIcon } })
export default class MRadio extends Vue {

    @Prop({ type: [Boolean, Number, String], default: false })
    private value!: boolean | number | string

    @Prop({ type: [Boolean, Number, String], default: true })
    private label!: boolean | number | string

    @Prop({ type: String, default: 'primary' })
    private color!: Color

    @Prop({ type: String, default: 'radio_button_checked' })
    private checkedIcon!: string

    @Prop({ type: String, default: 'radio_button_unchecked' })
    private uncheckIcon!: string

    @Prop({ type: Boolean, default: false })
    private disabled!: boolean

    get classes(): any {
        return {
            [`m--disabled`]: this.disabled,
        }
    }

    @Emit('input')
    private onInput(val: any): void { return }

    private handleClick(val: any): void {
        if (this.disabled) { return }
        this.onInput(val)
    }

    private render(): VNode {
        const { $slots, classes, checkedIcon, uncheckIcon, value, label, color, handleClick } = this
        const isCheck = label === value

        const RRadio = () => (
            <a staticClass={`${prefix}__checkbox`} class={isCheck ? `m--color-${color}` : ''}>
                <transition name='m--transition-scale'>
                    {isCheck ? <MIcon class={`${prefix}__check-icon`} name={checkedIcon} /> : null }
                </transition>
                <MIcon name={uncheckIcon} />
                <div v-m-ripple staticClass={`${prefix}__checkbox-wrapper`} />
            </a>
        )

        return (
            <div staticClass={`${prefix}`} class={classes} onClick={() => handleClick(label)}>
                {RRadio()}
                {$slots.default}
            </div>
        )
    }
}
