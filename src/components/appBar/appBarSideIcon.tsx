import { Component, Prop, Provide, Inject, Model, Vue } from 'vue-property-decorator'

const name = 'MAppBarSideIcon'
const prefix = 'm-app-bar-side-icon'

@Component({
    name,
})
export default class MAppBarSideIcon extends Vue {
    @Prop({ type: [String] })
    private bgColor !: string

    public render(h: any) {
        return (
            <div staticClass={prefix}>
                {this.$slots.default}
            </div>
        )
    }
}
