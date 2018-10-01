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
    private color!: Color

    get classes(): any {
        return {
            [`m--color-${this.color}`]: this.color,
        }
    }

    @Emit('confirm')
    public handleConfirm(): void { return }

    @Emit('cancel')
    public handleCancel(): void { return }

    public render(): VNode {
        const { classes, handleConfirm, handleCancel } = this

        return (
            <div staticClass={`${prefix} m--p-sm`} class={classes}>
                <MButton class="m--m-0 m--p-0"
                         size="md"
                         variety="flat"
                         color="primary"
                         onClick={handleCancel}>cancel</MButton>
                <MButton class="m--m-0 m--p-0"
                         size="md"
                         variety="flat"
                         color="primary"
                         onClick={handleConfirm}>ok</MButton>
            </div>
        )
    }
}
