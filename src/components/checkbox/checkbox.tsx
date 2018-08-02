import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color } from '@/types/model'
import { deepClone } from '@/utils'
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

    @Emit('input')
    private handleInput(val: any): any { void(0) }

    private isArrayValue: boolean = false

    private isArrayLabel: boolean = false

    private handleClick(isCheck: boolean): void {
        if (this.isArrayValue && this.isArrayLabel){
            if(isCheck){
                this.handleInput([])
            } else {
                this.handleInput(this.label)
            }
        } else if (this.isArrayValue) {
            let result: any[] = [].concat(this.value)
            if(isCheck){
                const index = result.findIndex(item => item === this.label)
                result.splice(index, 1)
                this.handleInput(result)
            } else {

                result.push(this.label)
                this.handleInput(result)
            }
        } else {
            if(isCheck) {
                this.handleInput(null)
            } else {
                this.handleInput(this.label)
            }
        }
    }

    public render(): VNode {
        const { $slots, checkedIcon, uncheckIcon, incheckIcon, value, label, color, handleClick } = this
        this.isArrayValue =  value instanceof Array
        this.isArrayLabel =  label instanceof Array

        let isCheck = false
        let checkIcon = checkedIcon

        if ( this.isArrayValue && this.isArrayLabel) {
            // Allcheck下value是数组, label也是数组
            if(value.length > 0) { isCheck = true }
            console.log(label.length > value.length)
            console.log(isCheck)
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
            <div staticClass={`${prefix}`} onClick={()=>handleClick(isCheck)}>
                {RCheckbox()}
                {$slots.default}
            </div>
        )
    }
}
