import { FunctionalComponentOptions } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

const name = 'MRow'
const prefix = 'm-row'

@Component({
    name,
    functional: true,
} as FunctionalComponentOptions)
export default class MRow extends Vue {
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
        type: String,
        default: 'normal',
    })
    private wrap!: string
    @Prop({
        type: String,
        default: 'start',
    })
    private justify!: string
    @Prop({
        type: String,
        default: 'stretch',
    })
    private align!: string
    @Prop({
        type: String,
        default: 'xs',
    })
    private space!: string
    @Prop({
        type: String,
    })
    private space!: string

    public render(h: any, { props, data, children }) {
        data.staticClass = data.staticClass !== undefined ? data.staticClass : ''
        data.staticClass += `${prefix} ${prefix}-wrap-${props.wrap} ${prefix}-justify-${props.justify} ${prefix}-align-${props.align} `
        if(props.space) data.staticClass += `${prefix}-space-${props.space}`
        data.staticClass = data.staticClass.trim()
        if (props.id) {
            data.domProps = data.domProps || {}
            data.domProps.id = props.id
        }

        return h(props.tag, data, children)
    }
}
