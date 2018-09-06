import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import { Size, Color } from '@/types/model'

@Component
export default class MTableColumn extends Vue {

    @Prop({ type: [ String, Number ], default: 'auto' })
    private width!: string

    @Prop({ type: String })
    private field!: string

}
