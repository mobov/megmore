import { Component, Prop, Provide, Model, Vue } from 'vue-property-decorator'
import { ComponentOptions, VNode } from 'vue'
// import Resize from '../../directives/resize'

const prefix = 'm-app'

@Component
export default class MApp extends Vue {

    public render(h: any, context: any) {
        return (
            <div staticClass={prefix}>
                {this.$slots.default}
            </div>
        )
    }
}
