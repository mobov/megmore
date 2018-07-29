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

    @Prop({ type: Boolean, default: true })
    private closeable!: boolean

    @Prop({ type: String, default: 'normal' })
    private variety!: Variety

    @Prop({ type: String, default: 'square' })
    private shape!: Shape

    get classes(): any {
        const isNormal = this.variety === 'normal'
        const isOutline = this.variety === 'outline'

        return{
            [`m--${this.size}`]: true,
            [`m--${this.variety}`]: true,
            [`m--${this.shape}`]: true,
            [`m--color-${this.type}`]: !isNormal,
            [`m--border-${this.type}`]: isOutline,
            [`m--bg-${this.type}`]: isNormal,
            [`m--elevation-${this.elevation}`]: this.elevation,
        }
    }

    public render(): VNode {
        const { classes } = this

        const RMedia = () => {
            return this.$slots.media ? <div staticClass={`${prefix}__media`}>
                {this.$slots.media}
            </div> : ''
        }

        const RClose = () => {
            return <MIcon name='cancel' />
        }

        return (
            <div staticClass={prefix} class={classes}>
                {RMedia()}
                <div staticClass={`${prefix}__content`}>
                    {this.$slots.default}
                </div>
                {RClose()}
            </div>
        )
    }
}
