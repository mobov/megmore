/**
 * 时间选择器底部
 */
import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import { VNode } from 'vue'
import { Color } from '@/types/model'
import MButton from "@/components/button"
import MFlexFiller from "@/components/layout/flex-filler"

const prefix = 'm-time-picker-handler'

@Component({ components: { MButton, MFlexFiller }})
export default class MTimePickerHandler extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Color

    get classes(): any {
        return {
            [`m--color-${this.type}`]: this.type,
        }
    }

    @Emit('confirm')
    public handleConfirm(): void { void(0) }

    @Emit('cancel')
    public handleCancel(): void { void(0) }

    public render(): VNode {
        const { classes, handleConfirm, handleCancel } = this

        return (
            <div staticClass={`${prefix} m--p-sm`} class={classes}>
                <MButton onClick={handleCancel}
                         class="m--m-0 m--p-0" size="md" variety="flat" type="primary">cancel</MButton>
                <MButton onClick={handleConfirm}
                         class="m--m-0 m--p-0" size="md" variety="flat" type="primary">ok</MButton>
            </div>
        )
    }
}
