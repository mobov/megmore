import { Component, Prop, Vue} from 'vue-property-decorator'
import { Size, Color, Variety, Shape } from '@/types/model'
import { genColor, genSize, genElevation, genShape } from '@/core/style-gen'
import { STATUS, VARIETY } from "@/core/constant"

const prefix = 'm-avatar'

@Component
export default class MAvatar extends Vue {

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

  @Prop({ type: String, default: '' })
  private src!: string

  private status: number = STATUS.pending

  private get styles(): any {
      const { color, fontColor, size, elevation, shape, variety } = this
      const styles = { }

      if (variety === VARIETY.outline) {
          genColor(styles, prefix, 'border-color', 'green')
          genColor(styles, prefix, 'color', 'green')
      }

      genColor(styles, prefix, 'color', color)
      genColor(styles, prefix, 'font-color', fontColor)
      genSize(styles, prefix, 'size', size)
      genElevation(styles, prefix, elevation)
      genShape(styles, prefix, shape)

      return styles
  }

  private get classes(): any {
    return {
        [`m--${this.variety}`]: true,
        [`m--${STATUS[this.status]}`]: true,

        // [`m--${this.shape}`]: true,
        // [`m--color-${this.type}`]: this.variety !== 'normal',
        // [`m--bg-${this.type}`]: this.variety === 'normal',
        // [`m--border-${this.type}`]: this.variety === 'outline',
        // [`m--elevation-${this.elevation}`]: this.elevation,
    }
  }

  private onLoad(): void {
    this.status = STATUS.success
  }

  private render(h: any) {
      const { src, styles, classes, onLoad } = this

      return (
          <div staticClass={prefix}
               style={styles}
               class={classes}>
               {this.$slots.default}
               <img onLoad={onLoad}
                    staticClass={`${prefix}__cover`}
                    alt=''
                    src={src} />
          </div>
      )
  }
}

