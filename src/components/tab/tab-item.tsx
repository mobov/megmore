import {Component, Vue, Watch, Prop, Inject} from 'vue-property-decorator'
import * as Model from '@/types/model'
import Tab from './tab'

@Component
class MTabItem extends Vue {
    @Prop({
        type: [String, Function],
        default: '',
    })
    public label!: string
    @Prop({
        type: String,
        default: '',
    })
    public name!: string
    @Inject()
    private tab!: Tab

    private mounted() {
        if (!this.tab.tabItems.includes(this)) {
            this.tab.setTabItem(this)
        }
    }

    private render() {
        return (
            <div staticClass='m-tab-item'>
                {this.$slots.default}
            </div>
        )
    }
}

export default MTabItem
