import {Component, Inject, Prop, Vue, Watch} from 'vue-property-decorator'
import {VNode} from "vue";
/**
 * 可切换显示隐藏组件mixin
 */
@Component
export default class Mixins extends Vue {
    @Prop({ type: String })
    public checkField?: string

    @Inject()
    public TableCols!: any

    @Inject()
    public TableData!: any

}
