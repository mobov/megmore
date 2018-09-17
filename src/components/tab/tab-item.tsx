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
            this.tab.setTabItemList(this)
        }
    }

    private render() {
        return (
            <transition name={this.tab.tabAnimationName}>
                <div staticClass='m-tab-item' v-show={this.tab.curTabName === this.name}>
                    {this.$slots.default}
                </div>
            </transition>
        )
    }
}

export default MTabItem
