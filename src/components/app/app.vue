<script lang="tsx">
import { Component, Prop, Provide, Model, Vue } from 'vue-property-decorator'
// import Resize from '../../directives/resize'

@Component({
    name: 'MApp',
    // directives: {
    //     Resize
    // }
})
export default class MApp extends Vue {

    @Provide()
    @Prop({ type: [String], default: 'default'})
    private theme : string

    @Prop({ type: [String] })
    private bgColor !: string


    public render(h: any) {
        let style = ''
        console.log(this.theme)
        console.log(this.$slots)
        return (
            <div staticClass="m-app"
                 class={`theme-${this.theme}`}
            >
                {this.$slots.default}
            </div>
        )
    }

}
</script>
<style lang="scss" scoped>
    @import "../../styles/components/app";
</style>
