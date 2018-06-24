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

    public render(h: any) {
        return (
            <div staticClass={prefix}>
                {this.$slots.default}
            </div>
        )
    }

}
