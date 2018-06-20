<script lang="tsx">
import { Component, Prop, Provide, Model, Vue } from 'vue-property-decorator'
import Resize from '../../directives/resize'

@Component({
    name: 'MApp'
})
export default class MApp extends Vue {
    directives: {
        Resize
    }

    @Prop({ type: [String], default: 'default'})
    private theme!: string

    @Prop({ type: [String] })
    private bgColor!: string

    public render(h: any) {
        console.log(this.theme)
        console.log(this.$slots)
        return (
            <div staticClass="m-app"
                 class={`theme-${this.theme}`}>
                {this.$slots.default}
            </div>
        )
    }

}
</script>
<style lang="scss" scoped>
    @import "../../styles/components/app";
</style>
