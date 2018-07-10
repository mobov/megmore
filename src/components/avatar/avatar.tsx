import { Component, Prop, Vue} from 'vue-property-decorator'
import { isHexColor, isStyleUnit } from 'es-treasure'
import { Model } from '@/types'

const name = 'MAvatar'
const prefix = 'm-avatar'

@Component({ name })
export default class MAvatar extends Vue {

  @Prop({ type: String, default: 'sm' })
  private size!: Model.Size | string

  @Prop({ type: Number, default: 0 })
  private elevation!: number

  @Prop({ type: String, default: 'primary' })
  private type!: Model.Color

  @Prop({ type: String, default: 'normal' })
  private variety!: Model.Variety

  @Prop({ type: String, default: 'square' })
  private shape!: Model.Shape

  @Prop({ type: String, default: '' })
  private src!: string

  private loaded: boolean = false

  get classes(): any {
    const classes = {
        [`${this.size}`]: true,
        [`${this.variety}`]: true,
        [`${this.shape}`]: true,
        [`color-${this.type}`]: this.variety !== 'normal' && !isHexColor(this.type),
        [`bg-${this.type}`]: this.variety === 'normal' && !isHexColor(this.type),
        [`border-${this.type}`]: this.variety === 'outline' && !isHexColor(this.type),
        [`elevation-${this.elevation}`]: this.elevation,
    }
    return classes
  }
  get imgClasses(): any {
    return this.loaded ? 'loaded' : ''
  }
  public onLoad(): void {
    this.loaded = true
  }
  public render(h: any) {
      console.log(this)
      const { src, classes, imgClasses, onLoad } = this

      return (
          <div staticClass={prefix}
               class={classes}>
               <img onLoad={onLoad} class={imgClasses} src={src} />
          </div>
      )
  }
}

