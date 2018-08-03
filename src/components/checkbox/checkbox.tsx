import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color } from '@/types/model'
const prefix = 'm-checkbox'

@Component({ components: { MIcon } })
export default class MCheckbox extends Vue {

    @Prop({ type: [Array, Number, String, Boolean], default: false })
    private value!: any

    @Prop({ type: [Array, Number, String, Boolean ], default: false })
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

    @Emit('input')
    private handleInput(val: any): any { void(0) }

        private isArrayValue: boolean = false

    private isArrayLabel: boolean = false

    private isBoolean: boolean = false

    get classes(): any {
        return {
            [`m--disabled`]: this.disabled,
        }
    }

    private handleClick(isCheck: boolean): void {
        const { disabled, isBoolean, isArrayValue, isArrayLabel, label, value, handleInput} = this
        if(disabled) { return }

        if (isArrayValue && isArrayLabel){
            if(isCheck){
                handleInput([])
            } else {
                handleInput(label)
            }
        } else if (this.isArrayValue) {
            let result: any[] = [].concat(value)
            if(isCheck){
                const index = result.findIndex(item => item === label)
                result.splice(index, 1)
                handleInput(result)
            } else {
                result.push(label)
                handleInput(result)
            }
        } else if(isBoolean) {
            handleInput(!value)
        } else {
            if(isCheck) {
                handleInput(null)
            } else {
                handleInput(label)
            }
        }
    }

    private render(): VNode {
        const { $slots, classes,
                checkedIcon, uncheckIcon, incheckIcon, value, label, color, handleClick } = this
        this.isArrayValue =  value instanceof Array
        this.isArrayLabel =  label instanceof Array
        // boolean模式下等价于switch
        this.isBoolean =  value instanceof Boolean

        let isCheck = false
        let checkIcon = checkedIcon

        if ( this.isArrayValue && this.isArrayLabel) {
            // Allcheck下value是数组, label也是数组
            if(value.length > 0) { isCheck = true }
            if(label.length > value.length && isCheck ){
                checkIcon = incheckIcon
                console.log(checkIcon)
            }
        } else if (this.isArrayValue) {
            // value是数组, label单值
            if(value.includes(label)) { isCheck = true }
        } else {
            if(value === label) { isCheck = true }
        }

        const RCheckbox = ()=> {
            return <a staticClass={`${prefix}__checkbox`} class={isCheck ? `m--color-${color}` : ''}>
                      <transition name="m--transition-scale">
                         {isCheck ? <MIcon class={`${prefix}__check-icon`} name={checkIcon} /> : null }
                      </transition>
                      <MIcon name={uncheckIcon} />
                      <div v-m-ripple staticClass={`${prefix}__checkbox-wrapper`} />
                   </a>
        }


        return (
            <div staticClass={`${prefix}`} class={classes} onClick={()=>handleClick(isCheck)}>
                {RCheckbox()}
                {$slots.default}
            </div>
        )
    }
}
