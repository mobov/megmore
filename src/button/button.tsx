import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
// import MSpin from '@/components/spin'
import { Size, Color, Variety, Shape } from '@/types/model'
import { VARIETY } from '@/core/constant'
import { genColor, genElevation, genShape, genSize, genHover } from '@/core/style-gen'

const prefix = 'm-button'

// @Component({ components: { MIcon, MSpin } })
@Component
export default class MButton extends Vue {
    @Prop({ type: String })
    private size!: Size | number | string

    @Prop({ type: Number })
    private elevation!: number

    @Prop({ type: String })
    private color!: Color

    @Prop({ type: String })
    private fontColor!: Color

    @Prop({ type: String })
    private shape!: Shape

    @Prop({ type: String, default: VARIETY.normal })
    private variety!: Variety

    @Prop({ type: Boolean })
    private block!: boolean

    @Prop({ type: Boolean })
    private loading!: boolean

    private get styles(): any {
        const { color, fontColor, size, elevation, shape } = this
        const styles = { }

        genColor(styles, prefix, 'color', color)
        genColor(styles, prefix, 'font-color', fontColor)
        genSize(styles, prefix, 'size', size)
        genElevation(styles, prefix, elevation)
        genShape(styles, prefix, shape)
        genHover(styles, prefix, 'hover-color', color)

        // console.log(styles)
        return styles
    }

    private get classes(): any {
        const { variety, block } = this

        return {
            [`m--variety-${variety}`]: true,
            ['m--block']: block,
        }
    }

    @Emit('click')
    private handleClick(e: MouseEvent): void { return }

    private render(): VNode {
        const { classes, styles, handleClick } = this

        return (
            <button v-m-ripple
                staticClass={prefix}
                style={styles}
                class={classes}
                onClick={handleClick}>
                {/*{this.loading && (this.$slots.spinner || <MSpin />)}*/}
                {this.$slots.default}
            </button>
        )
    }
}
