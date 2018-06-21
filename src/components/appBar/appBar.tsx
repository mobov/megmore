import { Component, Prop, Provide, Inject, Model, Vue } from 'vue-property-decorator'

const name = 'MAppBar'
const prefix = 'm-app-bar'

@Component({
    name,
})
export default class MAppBar extends Vue {
    @Prop({ type: [String] })
    private bgColor !: string

    @Prop({ type: [String], default: 'sm' })
    private size !: string

    public render(h: any) {
        return (
            <div staticClass={prefix}
                 class={`${prefix}--${this.size}`}
            >
                {this.$slots.default}
            </div>
        )
    }

}