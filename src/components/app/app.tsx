import { Component, Prop, Provide, Model, Vue } from 'vue-property-decorator'
import { Gunpla } from '../Megmore/theme'
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



    public render(h: any) {
        console.log(Vue)
        return (
            <div staticClass={prefix}>
                {this.$slots.default}
            </div>
        )
    }

}
