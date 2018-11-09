import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color } from '@/types/model'
const prefix = 'm-checkbox'

@Component({ components: { MIcon } })
export default class MCheckbox extends Vue {

    @Prop({ type: String, default: 'md' })
    private size?: Size

    @Prop({ type: [Array, Number, String, Boolean], default: false })
    private value!: any

    @Prop({ type: [Array, Number, String, Boolean ], default: true })
    private label!: any

    @Prop({ type: String, default: 'primary' })
    private color!: Color

    @Prop({ type: String, default: 'check_box' })
    private checkedIcon!: string

    @Prop({ type: String, default: 'check_box_outline_blank' })
    private uncheckIcon!: string

    @Prop({ type: String, default: 'indeterminate_check_box' })
    private incheckIcon!: string

    @Prop({ type: Boolean, default: false })
    private disabled!: boolean

    private isArrayValue: boolean = false

    private isArrayLabel: boolean = false

    private isBooleanValue: boolean = false

    get classes(): any {

        return {
            [`m--disabled`]: this.disabled,
            [`m--${this.size}`]: true,
        }
    }

    @Emit('input')
    private onInput(val: any): void { return }

    private handleClick(isCheck: boolean): void {
        const { disabled, isBooleanValue, isArrayValue, isArrayLabel, label, value, onInput } = this
        if (disabled) { return }

        if (isArrayValue && isArrayLabel) {
            if (isCheck) {
                onInput([])
            } else {
                onInput(label)
            }
        } else if (this.isArrayValue) {
            const result: any[] = [].concat(value)
            if (isCheck) {
                const index = result.findIndex(item => item === label)
                result.splice(index, 1)
                onInput(result)
            } else {
                result.push(label)
                onInput(result)
            }
        } else if (isBooleanValue) {
            onInput(!value)
        } else {
            if (isCheck) {
                onInput(null)
            } else {
                onInput(label)
            }
        }
    }

    private render(): VNode {
        const { $slots, classes, color, size, checkedIcon, uncheckIcon, incheckIcon,
                value, label, handleClick } = this
        this.isArrayValue =  value instanceof Array
        this.isArrayLabel =  label instanceof Array
        // boolean模式下等价于switch
        this.isBooleanValue = typeof value === 'boolean'
        let isCheck = false
        let checkIcon = checkedIcon

        console.log(size)

        if ( this.isArrayValue && this.isArrayLabel) {
            // Allcheck下value是数组, label也是数组
            if (value.length > 0) { isCheck = true }
            if (label.length > value.length && isCheck ) {
                checkIcon = incheckIcon
            }
        } else if (this.isArrayValue) {
            // value是数组, label单值
            if (value.includes(label)) { isCheck = true }
        } else {
            if (value === label) { isCheck = true }
        }

        const RCheckbox = () => (
            <a staticClass={`${prefix}__checkbox`}
               class={isCheck ? `m--color-${color}` : ''}>
                <transition name='m-transition-scale'>
                    {isCheck
                        ? <MIcon class={`${prefix}__check-icon`}
                                 name={checkIcon}
                                 size={size}/>
                        : undefined
                    }
                </transition>
                <MIcon size={size} name={uncheckIcon} />
                <div v-m-ripple staticClass={`${prefix}__checkbox-wrapper`} />
            </a>
        )


        return (
            <div staticClass={`${prefix}`}
                 class={classes}
                 onClick={() => handleClick(isCheck)}>
                {RCheckbox()}
                {$slots.default}
            </div>
        )
    }
}
