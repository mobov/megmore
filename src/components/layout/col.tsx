import { FunctionalComponentOptions } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

const name = 'MCol'
const prefix = 'm-col'

const gridCols = 12
const sizeMap: any = {
    xs: 20,
    sm: 30,
    md: 40,
    lg: 50,
    xl: 60,
}

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
        default: 12,
    })
    private sm!: number
    @Prop({
        type: Number,
        default: 12,
    })
    private md!: number
    @Prop({
        type: Number,
        default: 12,
    })
    private lg!: number
    @Prop({
        type: Number,
        default: 12,
    })
    private xl!: number
    public render(h: any, { props, data, children }) {
        const staticClass = data.staticClass !== undefined ? data.staticClass : ''
        data.staticClass = `${prefix} ${prefix}-xs-${props.xs} ${prefix}-sm-${props.sm} ${prefix}-md-${props.md} ${prefix}-lg-${props.lg} ${prefix}-xl-${props.xl} ${staticClass}`.trim()
        if (props.id) {
            data.domProps = data.domProps || {}
            data.domProps.id = props.id
        }

        return h(props.tag, data, children)
    }
}
