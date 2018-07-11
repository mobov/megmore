import { FunctionalComponentOptions, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as iconLib from '../../icons'
const presetIcons = ['menu', 'close', 'search','arrow_drop_down']// 预设注册Icon
const name = 'MIcon'
const prefix = 'm-icon'

const sizeMap: any = {
    xs: 20,
    sm: 30,
    md: 40,
    lg: 50,
    xl: 60,
}

const Icons: any = {}

presetIcons.forEach((icon) => {
    Icons[icon] = iconLib[`MIcon_${icon}`][icon]
})
@Component({
    name,
    functional: true,
} as FunctionalComponentOptions)
export class MIcon extends Vue {
    @Prop({ type: String })
    private name!: string

    @Prop({ type: [String, Number], default: 'sm' })
    private size!: string | number

    @Prop({ type: String, default: '#000000' })
    private color!: string

    public render(h: any, { props, data, children, listeners }: any): VNode {
        const icon = Icons[props.name]
        if (icon === undefined) {
            console.error(`存在未注册的图标${props.name}`)
            return <template />
        }

        const height = sizeMap[props.size] ? sizeMap[props.size] : props.size
        const width = height * (icon.height / icon.width)
        const staticClasses = data.staticClass !== undefined ? data.staticClass : ''
        const classes = data.class !== undefined ? data.class : ''
        const styles = Object.assign({ fill: 'currentColor' }, data.style, data.staticStyle)
        const click = listeners.click || function () { }
        return (
            <svg xmlns='http://www.w3.org/2000/svg'
                version='1.1'
                staticClass={`${prefix} ${prefix}--${props.name} ${staticClasses}`}
                class={`${classes}`}
                style={styles}
                height={height}
                width={width}
                viewBox={icon.viewBox}
                onClick={click}
            >

                {icon.paths ? icon.paths.map((path: string) => <path d={path} />) : ''}
                {icon.polygons ? icon.polygons.map((path: string) => <polygon points={path} />) : ''}
            </svg>
        )
    }
}

export function setIcons(data: any = {}): void {
    for (const item in data) {
        if (data.hasOwnProperty(item)) {
            const icon = data[item]
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

            Icons[item] = icon
        }
    }
}
