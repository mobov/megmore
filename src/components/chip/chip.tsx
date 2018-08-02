import { Component, Prop, Emit, Model, Provide, Vue } from 'vue-property-decorator'
import { Size, Color, Variety, Shape } from '@/types/model'
import MAvatar from '../../components/avatar/avatar'
import MIcon from '../../components/icon/'
import { VNode } from 'vue'

const prefix = 'm-chip'

@Component({ components: { MAvatar, MIcon }})
export default class MChip extends Vue {

    @Prop({ type: String, default: 'sm' })
    private size!: Size | string

    @Prop({ type: String, default: 'primary' })
    private type!: Color

    @Prop({ type: Number, default: 2 })
    private elevation!: number

    @Prop({ type: String, default: 'normal' })
    private variety!: Variety

    @Prop({ type: String, default: 'circle' })
    private shape!: Shape

    @Prop({ type: Boolean, default: false })
    private closetoggle!: boolean

    @Emit('close')
    handleClose(e: MouseEvent): void {
        e.stopPropagation()
    }

    @Emit('click')
    handleClick(e: MouseEvent): void { void(0) }

    get classes(): any {
        const isNormal  = this.variety === 'normal'
        const isOutline = this.variety === 'outline'

        return{
            [`m--${this.size}`]: true,
            [`m--${this.variety}`]: true,
            [`m--${this.shape}`]: true,
            [`m--color-${this.type}`]: !isNormal,
            [`m--border-${this.type}`]: isOutline,
            [`m--bg-${this.type}`]: isNormal,
            [`m--elevation-${this.elevation}`]: this.elevation,
            [`m--closeable`]: this.$listeners.close,
            [`m--closetoggle`]: this.closetoggle,
        }
    }

    public render(): VNode {
        const { classes, $slots, $listeners, closetoggle, handleClose, handleClick } = this

        const RMedia = () => {
            return $slots.media ? <div staticClass={`${prefix}__media`}>
                {$slots.media}
            </div> : ''
        }

        const RClose = () => {
            return $listeners.close || closetoggle ? <MIcon onClick={handleClose} name='cancel' /> : ''
        }

        return (
            <div staticClass={prefix} class={classes} onClick={handleClick}>
                {RMedia()}
                <div staticClass={`${prefix}__content`}>
                    {$slots.default}
                </div>
                {RClose()}
            </div>
        )
    }
}
