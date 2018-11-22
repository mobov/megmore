import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
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
  private curSrc: string | any = ''

  private get styles(): any {
      const { color, fontColor, size, elevation, shape } = this
      const styles = { }

      genColor(styles, prefix, 'color', color)
      genColor(styles, prefix, 'font-color', fontColor)
      genSize(styles, prefix, 'size', size)
      genElevation(styles, prefix, elevation)
      genShape(styles, prefix, shape)

      return styles
  }

  @Watch('src', { immediate: true })
  private srcUpdate(val: any): void {
      if (val !== undefined) {
          this.status = STATUS.pending
          this.curSrc = val
      }
  }

  private get classes(): any {
    return {
        [`m--variety-${this.variety}`]: true,
        [`m--status-${STATUS[this.status]}`]: true,
    }
  }

  private loadSuccess(): void {
    this.status = STATUS.success
  }

  private loadFailure(): void {
    this.status = STATUS.failure
  }

  private render(h: any) {
      const { curSrc, styles, classes, loadSuccess, loadFailure } = this

      return (
          <div staticClass={prefix}
               style={styles}
               class={classes}>
               {this.$slots.default}
               <img onLoad={loadSuccess}
                    onError={loadFailure}
                    staticClass={`${prefix}__cover`}
                    alt=''
                    src={curSrc} />
          </div>
      )
  }
}

