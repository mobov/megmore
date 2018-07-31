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

    @Emit('input')
    public handleClick(val: boolean | number): void { void(0) }

    public changeStart(){
        console.log('changeStart')
    }

    public changeEnd(){
        console.log('changeEnd')
    }

    public render(): VNode {
        const { $slots, checkedIcon, uncheckIcon, value, color, handleClick, changeStart, changeEnd } = this

        const RCheckbox = ()=> {
            return <a staticClass={`${prefix}__checkbox`} class={value ? `m--color-${color}` : ''}>
                        <div v-m-ripple staticClass={`${prefix}__checkbox-wrapper`} />
                        <transition name="m--transition-scale" onAfterEnter={changeStart} onAfterLeave={changeEnd}>
                            {value ? <MIcon class={`${prefix}__check-icon`} name={checkedIcon} /> : null }
                        </transition>
                        <MIcon name={uncheckIcon} />
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
