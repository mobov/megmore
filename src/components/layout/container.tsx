import { FunctionalComponentOptions } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

const name = 'MContainer'
const prefix = 'm-container'

@Component({
    name,
    functional: true,
} as FunctionalComponentOptions)
export default class MContainer extends Vue {
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
        const staticClass = data.staticClass !== undefined ? data.staticClass : ''
        data.staticClass = `${prefix} ${staticClass}`.trim()

        if (props.id) {
            data.domProps = data.domProps || {}
            data.domProps.id = props.id
        }
        return h(props.tag, data, children)
    }
}
