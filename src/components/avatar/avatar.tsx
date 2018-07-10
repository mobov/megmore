import { Component, Prop, Vue} from 'vue-property-decorator'
import { isHexColor, isStyleUnit } from 'es-treasure'
import { Model } from '@/types'

const name = 'MAvatar'
const prefix = 'm-avatar'

@Component({ name })
export default class MAvatar extends Vue {

  @Prop({ type: String, default: 'md' })
  private size!: Model.Size | string

  @Prop({ type: Number, default: 0 })
  private elevation!: number

  @Prop({ type: String, default: 'primary' })
  private type!: Model.Color

  @Prop({ type: String, default: 'normal' })
  private variety!: Model.Variety

  @Prop({ type: String, default: 'square' })
  private shape!: Model.Shape

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

  public render(createElement: any, context: any) {
      const name = context.props.name
      const type = context.props.type
      const staticClasses = context.data.staticClass !== undefined ? context.data.staticClass : ''
      const classes = context.data.class !== undefined ? context.data.class : ''
      const styles = Object.assign({},context.data.style, context.data.staticStyle)

      return (
          <div staticClass={prefix}
                class={`${type} ${classes} ${staticClasses}`}
                style={styles}
          >

          </div>
      )
  }

  // public render(h: any, { data, props, children }: any) {
  //   const { size, bgColor, color, shadow } = props
  //   data.staticClass = `${prefix} ${data.staticClass || ''} `
  //   data.style = data.style || {}
  //
  //   if (sizeMap.indexOf(size)) {
  //     data.staticClass += `${size} `
  //   } else if (isStyleUnit(size)) {
  //     Object.assign(data.style, {
  //       height: size,
  //       width: size,
  //     })
  //   }
  //
  //   if (isHexColor(bgColor)) {
  //     Object.assign(data.style, {
  //       backgroundColor: bgColor,
  //     })
  //   } else {
  //     data.staticClass += `bg-${bgColor} `
  //   }
  //
  //   if (isHexColor(color)) {
  //     Object.assign(data.style, {
  //       color,
  //     })
  //   } else {
  //     data.staticClass += `color-${color} `
  //   }
  //   data.staticClass = data.staticClass.trim()
  //   return h('div', data, children)
  // }
}
