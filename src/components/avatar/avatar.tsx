import { Component, Prop, Vue} from 'vue-property-decorator'
import { Size, Color, Variety, Shape } from '@/types/model'
import { isHexColor, isStyleUnit } from 'es-treasure'


const prefix = 'm-avatar'

@Component
export default class MAvatar extends Vue {

  @Prop({ type: String, default: 'sm' })
  private size!: Size | string

  @Prop({ type: Number, default: 0 })
  private elevation!: number

  @Prop({ type: String, default: 'primary' })
  private type!: Color

  @Prop({ type: String, default: 'normal' })
  private variety!: Variety

  @Prop({ type: String, default: 'square' })
  private shape!: Shape

  @Prop({ type: String, default: '' })
  private src!: string

  private loaded: boolean = false

  get classes(): any {
    return {
        [`m--${this.size}`]: true,
        [`m--${this.variety}`]: true,
        [`m--${this.shape}`]: true,
        [`m--color-${this.type}`]: this.variety !== 'normal',
        [`m--bg-${this.type}`]: this.variety === 'normal',
        [`m--border-${this.type}`]: this.variety === 'outline',
        [`m--elevation-${this.elevation}`]: this.elevation,
    }
  }

  get imgClasses(): any {
    return this.loaded ? 'loaded' : ''
  }

  public onLoad(): void {
    this.loaded = true
  }

  public render(h: any) {
      const { src, classes, imgClasses, onLoad } = this

      return (
          <div staticClass={prefix}
               class={classes}>
               {this.$slots.default}
               <img onLoad={onLoad}
                    class={imgClasses}
                    src={src} />
          </div>
      )
  }
}

