import { FunctionalComponentOptions, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BREAKPOINTS } from '@/core/constant'
import { genStaticStyles } from '@/core/style-gen'

const prefix = 'm-row'

@Component({ functional: true } as FunctionalComponentOptions)
export default class MRow extends Vue {

    @Prop({ type: String })
    private id!: string

    @Prop({ type: String, default: 'div' })
    private tag!: string

    @Prop({ type: String, default: 'normal' })
    private wrap!: string

    @Prop({ type: String, default: 'start' })
    private justify!: string

    @Prop({ type: String, default: 'stretch' })
    private align!: string

    @Prop({ type: String, default: 'xs' })
    private space!: string

    @Prop({ type: Number })
    private cols!: number

    public render(h: any, { props, data, children }: any): VNode {
        data.staticClass = data.staticClass !== undefined ? data.staticClass : ''
        data.staticClass += `${prefix} ${prefix}--wrap-${props.wrap} ${prefix}--justify-${props.justify} ${prefix}--align-${props.align} `
        if (props.space) { data.staticClass += `${prefix}--space-${props.space}` }
        data.staticClass = data.staticClass.trim()

        if (props.cols) {
            if (!data.staticStyle) {
                data.staticStyle = {}
            }
            genStaticStyles(data.staticStyle, prefix, 'cols', props.cols)
        }

        if (props.id) {
            data.domProps = data.domProps || {}
            data.domProps.id = props.id
        }

        return h(props.tag, data, children)
    }
}
