import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
// import MSpin from '@/components/spin'
import MIcon from '@/icon'
import { Size, Color, Variety, Shape } from '@/types/model'
import { VARIETY, SHAPE } from '@/core/constant'
import { genColor, genElevation, genSize, genHover } from '@/core/style-gen'

const prefix = 'm-button'

// @Component({ components: { MIcon, MSpin } })
@Component({ components: { MIcon }})
export default class MButton extends Vue {
    @Prop({ type: String })
    private size!: Size | number | string

    @Prop({ type: Number })
    private elevation!: number

    @Prop({ type: String })
    private color!: Color

    @Prop({ type: String })
    private fontColor!: Color

    @Prop({ type: String, default: SHAPE.corner })
    private shape!: Shape

    @Prop({ type: String, default: VARIETY.normal })
    private variety!: Variety

    @Prop({ type: Boolean })
    private block!: boolean

    @Prop({ type: String })
    private icon!: string

    @Prop({ type: Boolean })
    private loading!: boolean

    private get styles(): any {
        const { color, fontColor, size, elevation } = this
        const styles = { }

        genColor(styles, prefix, 'color', color)
        genColor(styles, prefix, 'font-color', fontColor)
        genSize(styles, prefix, 'size', size)
        genElevation(styles, prefix, elevation)
        genHover(styles, prefix, 'hover-color', color)

        // console.log(styles)
        return styles
    }

    private get classes(): any {
        const { variety, shape, block } = this

        return {
            [`m--variety-${variety}`]: true,
            [`m--shape-${shape}`]: true,
            ['m--block']: block,
        }
    }

    @Emit('click')
    private handleClick(e: MouseEvent): void { return }

    private render(): VNode {
        const { classes, styles, icon, handleClick } = this

        return (
            <button v-m-ripple
                staticClass={prefix}
                style={styles}
                class={classes}
                onClick={handleClick}>
                {/*{this.loading && (this.$slots.spinner || <MSpin />)}*/}
                {icon ? <MIcon name={icon}/> : undefined}
                {this.$slots.default
                    ? (<div class={`${prefix}__main`}>{this.$slots.default}</div>)
                    : undefined}
            </button>
        )
    }
}
