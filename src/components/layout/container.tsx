import { FunctionalComponentOptions} from 'vue'
import { Component, Prop, Vue} from 'vue-property-decorator'

const name = 'MContainer'
const prefix = 'm-container'

@Component({
    name,
    functional: true,
} as FunctionalComponentOptions)
export class MIcon extends Vue {
    @Prop({
        type: String,
    })
    private id!: string
    @Prop({
        type: String,
        default: 'div',
    })
    private tag!: string

    public render(h: any, { props, data, children }) {
        data.staticClass = `${prefix}` + data.staticClass !== undefined ? data.staticClass : ''
        if (props.id) {
            data.domProps = data.domProps || {}
            data.domProps.id = props.id
        }
        return h(props.tag, data, children)
    }
}
