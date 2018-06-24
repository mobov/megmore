
import { FunctionalComponentOptions} from 'vue'
// import Paths from './paths'
import { Component, Prop, Vue} from 'vue-property-decorator'
import { isHexColor, isStyleUnit } from 'es-treasure'
const name = 'MIcon'
const prefix = 'm-icon'

@Component({
  name,
  functional: true,
} as FunctionalComponentOptions)
export default class MIcon extends Vue {

  @Prop({
    type: [String, Number],
    default: 'sm',
  })
  private size!: string|number

  @Prop({
    type: [String],
    default: '#000000',
  })
  private color!: string

    public render(createElement: any, context: any) {
        // console.log(createElement)
        // console.log(context)
        // console.log(name)
        // const icon = (import('@/views/' + file + '.vue')).default
        console.log()
        const name = context.props.name
        // const path = Paths[name]
        // console.log(path)

        // console.log(path)
        const staticClasses = context.data.staticClass !== undefined ? context.data.staticClass : ''
        const classes = context.data.class !== undefined ? context.data.class : ''
        const styles = Object.assign({},context.data.style, context.data.staticStyle)

        return (
	        <svg xmlns="http://www.w3.org/2000/svg"
                 version="1.1"
                 staticClass={`${prefix} ${prefix}-- ${staticClasses}`}
                 class={`${classes}`}
                 style={styles}
            >
		        <path d={path} />
	        </svg>
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
