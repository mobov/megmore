import { Component, Prop, Provide, Inject, Model, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { Size } from '@/types/model'
import { genColor, genSize, genElevation } from '@/core/style-gen'

const prefix = 'm-app-bar'

@Component
export default class MAppBar extends Vue {

    @Prop({ type: String })
    private size !: Size | number | string

    @Prop({ type: Number })
    private elevation!: number

    @Prop({ type: [String, Number] })
    private fontColor!: string

    @Prop({ type: [String, Number] })
    private color!: string

    private get styles(): any {
        const { color, fontColor, size, elevation } = this
        const styles = { }

        genColor(styles, prefix, 'color', color)
        genColor(styles, prefix, 'font-color', fontColor)
        genSize(styles, prefix, 'size', size)
        genElevation(styles, prefix, elevation)

        return styles
    }

    private render(h: any): VNode {
        const { styles } = this

        return (
            <div staticClass={prefix}
                 style={styles}>
                {this.$slots.default}
            </div>
        )
    }
}
