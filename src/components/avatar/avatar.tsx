
import { FunctionalComponentOptions} from 'vue'
import { Component, Prop, Vue} from 'vue-property-decorator'
import { isHexColor, isStyleUnit } from 'es-treasure'

const name = 'MAvatar'
const prefix = 'm-avatar'

const sizeMap = ['xs', 'sm', 'md', 'lg', 'hg']

@Component({
  name,
  functional: true,
} as FunctionalComponentOptions)
export default class MAvatar extends Vue {

  @Prop({
    type: [String, Number],
    default: 'sm',
  })
  private size!: string|number

  @Prop({
    type: [Number],
    default: 0,
  })
  private elevation!: number

// { data, props, children }
    public render(createElement: any, context: any) {
        console.log(createElement)
        console.log(context)


        // console.log(props)
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
