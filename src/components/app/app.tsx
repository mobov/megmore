import { Component, Prop, Provide, Model, Vue } from 'vue-property-decorator'
// import Resize from '../../directives/resize'
const name = 'MApp'
const prefix = 'm-app'

@Component({
    name,
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
        console.log(this.theme)
        console.log(this.$slots)

        return (
            <div staticClass={prefix}
                 class={`theme-${this.theme}`}
            >
                {this.$slots.default}
            </div>
        )
    }

}
