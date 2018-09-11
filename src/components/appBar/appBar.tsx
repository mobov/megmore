import { Component, Prop, Provide, Inject, Model, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { Size } from '@/types/model';

const prefix = 'm-app-bar'

@Component
export default class MAppBar extends Vue {

    @Prop({ type: String, default: 'sm' })
    private size !: Size

    public render(h: any): VNode {
        return (
            <div staticClass={prefix}
                 class={`${prefix}--${this.size}`}>
                {this.$slots.default}
            </div>
        )
    }
}
