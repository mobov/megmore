import { FunctionalComponentOptions, VNode } from 'vue'
import { BREAKPOINTS } from '@/core/constant'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { genStaticStyles } from '@/core/style-gen'

const prefix = 'm-col'

@Component({ functional: true } as FunctionalComponentOptions)
export default class MCol extends Vue {
    @Prop({ type: String })
    private id!: string

    @Prop({ type: String, default: 'div' })
    private tag!: string

    @Prop({ type: Number })
    private xs!: number

    @Prop({ type: Number })
    private sm!: number

    @Prop({ type: Number })
    private md!: number

    @Prop({ type: Number })
    private lg!: number

    @Prop({ type: Number })
    private xl!: number

    public render(h: any, { props, data, children }: any) {
        const staticClass = data.staticClass !== undefined ? data.staticClass : ''
        data.staticClass = `${prefix} ${staticClass} `
        data.staticClass = data.staticClass.trim()

        if (!(data.staticStyle)) { data.staticStyle = {} }
        BREAKPOINTS.forEach((breakpoint: string) => {
            if (props[breakpoint]) {
                genStaticStyles(data.staticStyle, prefix, `span-${breakpoint}`, props[breakpoint])
            }
        })
        if (props.id) {
            data.domProps = data.domProps || {}
            data.domProps.id = props.id
        }
        return h(props.tag, data, children)
    }
}
