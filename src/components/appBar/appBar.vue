<script lang="tsx">
import { Component, Prop, Provide, Inject, Model, Vue } from 'vue-property-decorator'

const name = 'MAppBar'

@Component({
    name,
})
export default class MAppBar extends Vue {
    @Prop({ type: [String] })
    private bgColor !: string

    @Prop({ type: [String], default: 'sm' })
    private size !: string

    public render(h: any) {
        console.log(this.$slots)
        return (
            <div staticClass={name}
                 class={`${name}--${size}`}
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
