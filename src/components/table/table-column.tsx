import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { Align, Color } from '@/types/model'

@Component
export default class MTableColumn extends Vue {

    @Prop({ type: [ String, Number ], default: 'auto' })
    private width?: string

    @Prop({ type: String })
    private field!: string

    @Prop({ type: Boolean, default: false })
    private rowCheck?: boolean

    @Prop({ type: String, default: 'center' })
    private align?: Align

    @Prop({ type: String, default: 'primary' })
    private color?: Color
}

