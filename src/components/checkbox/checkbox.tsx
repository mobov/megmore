import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Size, Color } from '@/types/model'

const prefix = 'm-checkbox'

@Component({ components: { MIcon } })
export default class MCheckbox extends Vue {

    @Prop({ type: [Boolean, Number], default: false })
    private value!: boolean | number

    @Prop({ type: String, default: 'primary' })
    private color!: Color

    @Prop({ type: String, default: 'check_box' })
    private checkedIcon!: string

    @Prop({ type: String, default: 'check_box_outline_blank' })
    private uncheckIcon!: string

    get classes(): any {
        return {

        }
    }

    @Emit('input')
    public handleClick(val: boolean | number): void {

    }

    public render(): VNode {
        const { $slots, checkedIcon, uncheckIcon, value, color, handleClick } = this


        const RCheckbox = ()=> {
            return <a staticClass={`${prefix}__checkbox`} class={value ? `m--color-${color}` : ''}>
                        <div v-m-ripple staticClass={`${prefix}__checkbox-wrapper`} />
                        <MIcon name={ value ? checkedIcon : uncheckIcon } />
                   </a>
        }

        return (
            <div staticClass={`${prefix}`} onClick={()=>handleClick(!value)}>
                {RCheckbox()}
                {$slots.default}
            </div>
        )
    }
}
