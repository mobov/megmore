import { FunctionalComponentOptions, VNode } from 'vue'
import Breakpoints, {default as breakpoints} from '../megmore/breakpoints'
import { Component, Prop, Vue } from 'vue-property-decorator'

const name = 'MCol'
const prefix = 'm-col'

@Component({
    name,
    functional: true,
} as FunctionalComponentOptions)
export default class MCol extends Vue {
    @Prop({
        type: String,
    })
    private id!: string
    @Prop({
        type: String,
        default: 'div',
    })
    private tag!: string
    @Prop({
        type: Number,
        default: 12,
    })
    private xs!: number
    @Prop({
        type: Number,
    })
    private sm!: number
    @Prop({
        type: Number,
    })
    private md!: number
    @Prop({
        type: Number,
    })
    private lg!: number
    @Prop({
        type: Number,
    })
    private xl!: number
    public render(h: any, { props, data, children }): VNode {
        const staticClass = data.staticClass !== undefined ? data.staticClass : ''
        data.staticClass = `${prefix} ${staticClass} `
        Breakpoints.forEach(breakpoint => {
            if (props[breakpoint]) {
                data.staticClass += `${prefix}-${breakpoint}-${props[breakpoint]} `
            }
        })
        data.staticClass = data.staticClass.trim()
        if (props.id) {
            data.domProps = data.domProps || {}
            data.domProps.id = props.id
        }
        return h(props.tag, data, children)
    }
}
