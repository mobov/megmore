
import { FunctionalComponentOptions} from 'vue'
// import Paths from './paths'
import { Component, Prop, Vue} from 'vue-property-decorator'
import { isHexColor, isStyleUnit } from 'es-treasure'

const name = 'MIcon'
const prefix = 'm-icon'


let Icons: any = {}
// function renderPaths (name: string){
//     let result : any[]
//     console.log(name)
//     const icon = Icons[name]
//     if(icon === undefined) console.error(`存在未注册的图标${name}`)
//     console.log(icon)
//     if(icon.paths){
//         // icon.paths.forEach(path => {
//         //     result.push(<path>{path}<path/>)
//         // })
//     }
//     // return  <path d={Icons[name]} />
//     // <template v-if="icon && icon.paths">
//     //
//     // </template>
//     // <template v-if="icon && icon.polygons">
//     //             <polygon v-for="(polygon, i) in icon.polygons" :key="`polygon-${i}`" v-bind="polygon"/>
//     //     <path v-for="(path, i) in icon.paths" :key="`path-${i}`" v-bind="path"/>    </template>
//     // <template v-if="icon && icon.raw"><g v-html="raw"></g></template>
// }

@Component({
  name,
  functional: true,
} as FunctionalComponentOptions)
export class MIcon extends Vue {
    @Prop({
        type: String,
        default: 'sm',
    })
    private name!: string

    @Prop({
        type: [String, Number],
        default: 'sm',
    })
    private size!: string|number

    @Prop({
        type: String,
        default: '#000000',
    })
    private color!: string

    public render(createElement: any, context: any) {
        const name = context.props.name
        const icon = Icons[name]
        if(icon === undefined){
            console.error(`存在未注册的图标${name}`)
            return ''
        }
        const height = context.props.height !== undefined ? context.props.height : icon.height
        const width = context.props.width !== undefined ? context.props.width : icon.width
        const staticClasses = context.data.staticClass !== undefined ? context.data.staticClass : ''
        const classes = context.data.class !== undefined ? context.data.class : ''
        const styles = Object.assign({},context.data.style, context.data.staticStyle)
        console.log(context)

        return (
	        <svg xmlns="http://www.w3.org/2000/svg"
                 version="1.1"
                 staticClass={`${prefix} ${prefix}--${staticClasses}`}
                 class={`${classes}`}
                 style={styles}
                 height={height}
                 width={width}
                 viewBox={icon.viewBox}
            >
                {icon.paths.map(path => <path d={path} />)}
	        </svg>
        )
    }
}

export function setIcons(data: any = {}) {
    for (let name in data) {
        let icon = data[name]

        if (icon.d) {
            if (!icon.paths) {
                icon.paths = []
            }
            icon.paths.push({ d: icon.d })
        }

        if (icon.points) {
            if (!icon.polygons) {
                icon.polygons = []
            }
            icon.polygons.push({ points: icon.points })
        }

        Icons[name] = icon
    }
}
