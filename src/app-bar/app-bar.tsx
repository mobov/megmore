import { Component, Prop, Provide, Inject, Model, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { genColor, genSize } from '@/core/util'
import defaults from './defaults'
import { Size } from '@/types/model'

const prefix = 'm-app-bar'

@Component
export default class MAppBar extends Vue {

    @Prop({ type: String })
    private size !: Size

    @Prop({ type: Number })
    private elevation!: number

    @Prop({ type: [String, Number] })
    private color!: string

    private get styles(): any {
        const { color, size } = this
        const backgroundColor = genColor(color)
        const height = genSize(size)
        return {
            ['backgroundColor']: backgroundColor,
            ['height']: height,
        }
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
