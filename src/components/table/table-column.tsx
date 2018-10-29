import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { Align, Color } from '@/types/model'

export const prefix = 'm-table-column'

@Component
export default class MTableColumn extends Vue {

    @Prop({ type: String })
    private title?: string

    @Prop({ type: [ String, Number ], default: 'auto' })
    private width?: string

    @Prop({ type: String })
    private field?: string

    @Prop({ type: String, default: 'center' })
    private align?: Align

    @Prop({ type: String, default: 'primary' })
    private color?: Color
}

