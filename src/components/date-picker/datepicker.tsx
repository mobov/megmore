import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { isHexColor } from 'es-treasure'
import MSpin from '@/components/spin'
import { Model } from '@/types'

const name = 'MDatePicker'
const prefix = 'm-date-picker'

@Component({
    name,
    components: { MIcon, MSpin },
})
export default class MButton extends Vue {
    @Prop({ type: String, default: 'default' })
    private color!: Model.Color

    @Prop({ type: String, default: 'normal' })
    private type!: Model.Variety

    @Prop({ type: Number })
    private elevation!: number

    public render(): VNode {
        return (
            <div v-m-ripple staticClass={prefix}>
            </div>
        )
    }
}
