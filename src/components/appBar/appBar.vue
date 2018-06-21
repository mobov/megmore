<script lang="tsx">
import { Component, Prop, Provide, Inject, Model, Vue } from 'vue-property-decorator'

@Component({
    name: 'MAppBar',
})
export default class MAppBar extends Vue {
    @Inject() theme !: string

    @Prop({ type: [String] })
    private bgColor !: string

    public render(h: any) {
        console.log(this.theme)
        console.log(this.$slots)
        return (
            <div staticClass="m-app-bar"
                 class={`theme-${this.theme}`}
            >
                {this.$slots.default}
            </div>
        )
    }

}
</script>
<style lang="scss" scoped>
    @import "../../styles/components/appBar";
</style>
