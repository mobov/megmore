import { Component, Prop, Provide, Model, Vue } from 'vue-property-decorator'
import { ComponentOptions, VNode } from 'vue'
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

    public render(h: any, context: any): VNode {
        return (
            <div staticClass={prefix}>
                {this.$slots.default}
            </div>
        )
    }
}
