import {Component, Inject, Prop, Vue, Watch} from 'vue-property-decorator'
import {VNode} from "vue";
/**
 * 可切换显示隐藏组件mixin
 */
@Component
export default class Mixins extends Vue {

    @Inject()
    public TableCols!: any

    @Inject()
    public TableStore!: any

}
