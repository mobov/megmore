import { Component, Prop, Emit, Model, Provide, Vue } from 'vue-property-decorator'
import { Size, Color, Variety, Shape } from '@/types/model'
import { genColor, genElevation, genSize, genHover } from '@/core/style-gen'
import MAvatar from '../avatar'
import MIcon from '../icon'
import { VNode } from 'vue'

const prefix = 'm-chip'

@Component({ components: { MAvatar, MIcon }})
export default class MChip extends Vue {

    @Prop({ type: String })
    private size!: Size | string

    @Prop({ type: String })
    private color!: Color

    @Prop({ type: String })
    private fontColor!: Color

    @Prop({ type: Number })
    private elevation!: number

    @Prop({ type: String, default: 'normal' })
    private variety!: Variety

    @Prop({ type: String, default: 'circle' })
    private shape!: Shape

    @Prop({ type: Boolean, default: false })
    private closeable!: boolean

    @Prop({ type: Boolean, default: false })
    private closeover!: boolean

    private get styles(): any {
        const { color, fontColor, size, elevation } = this
        const styles = { }

        genColor(styles, prefix, 'color', color)
        genColor(styles, prefix, 'font-color', fontColor)
        genSize(styles, prefix, 'size', size)
        genElevation(styles, prefix, elevation)
        genHover(styles, prefix, 'hover-color', color)

        return styles
    }

    private get classes(): any {
        const { variety, shape, closeable, closeover } = this

        return{
            [`m--variety-${variety}`]: true,
            [`m--shape-${shape}`]: true,
            [`${prefix}--closeable`]: closeable,
            [`${prefix}--closeover`]: closeover,
        }
    }

    @Emit('close')
    private handleClose(e: MouseEvent): void {
        e.stopPropagation()
    }

    @Emit('click')
    private handleClick(e: MouseEvent): void { return }

    private RMedia(): VNode[] | undefined  {
        const { $slots } = this

        if ($slots.media) {
            if (!$slots.media[0]!.data!.staticClass) {
                $slots.media[0]!.data!.staticClass = ''
            }
            $slots.media[0]!.data!.staticClass += ` ${prefix}__media`

            return $slots.media
        }
        return undefined
    }

    private RClose(): VNode | undefined {
        const { closeable, closeover, handleClose } = this

        return (closeable || closeover
            ? <MIcon staticClass={`${prefix}__close`} onClick={handleClose} name='cancel' />
            : undefined)
    }

    private render(): VNode {
        const { classes, styles, $slots,  RMedia, RClose, handleClick } = this

        return (
            <div staticClass={prefix}
                 style={styles}
                 class={classes}
                 onClick={handleClick}>
                {RMedia()}
                <div staticClass={`${prefix}__main`}>
                    {$slots.default}
                </div>
                {RClose()}
            </div>
        )
    }
}
