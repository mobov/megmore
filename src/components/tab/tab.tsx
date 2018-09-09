import {Component, Vue, Watch, Prop, Provide} from 'vue-property-decorator';
import * as Model from '@/types/model';
import {colorDetermine} from '@/utils/helpers';
import TabItem from './tab-item';

@Component
class MTab extends Vue {
    public tabItems: TabItem[] = [];
    public curTabName: string = '';

    public setTabItem(item: TabItem) {
        if (this.tabItems.length === 0) {
            this.curTabName = item.name
        }
        this.tabItems.push(item);
    }


    private underlineStyle = {}

    @Provide()
    private get tab() {
        return this;
    }

    @Prop({
        type: String,
        default: 'primary'
    })
    private color!: string;

    @Prop({
        type: String,
        default: 'success'
    })
    private lineColor!: string;

    @Prop({
        type: String,
        default: ''
    })
    private value!: string;

    @Watch('curTabName', {immediate: true})
    @Watch('value', {immediate: true})
    private async onNameChange(name: string) {
        this.$emit('input', name)
        this.curTabName = name
        await this.$nextTick()
        this.setUnderlineStyle()
    }

    private get labelsColorData() {
        return colorDetermine(this.color, 'bg');
    }

    private get underLineColorData() {
        return colorDetermine(this.lineColor, 'bg');
    }

    private get() {

    }

    private get _tabItems() {
        return this.tabItems.map(item => ({
            name: item.name,
            label: item.label
        }));
    }

    private setUnderlineStyle() {
        if (this.$el) {
            const dom = this.$el.querySelector(`[data-tab-name=${this.curTabName}]`)
            const wrapDom=this.$el.querySelector('.m-tab__labels')
            const rect = (dom as HTMLElement).getBoundingClientRect()
            const wrapRect = (wrapDom as HTMLElement).getBoundingClientRect()
            const left=rect.left-wrapRect.left
            this.underlineStyle = {
                width: `${rect.width}px`,
                left:`${left}px`,
            }
        }
    }

    private setCurTab(name: string) {
        this.curTabName = name
    }

    private render() {
        const labelsCls = {
            ...this.labelsColorData.class
        }
        const underLineCls = {
            ...this.underLineColorData.class
        }
        console.log(this.underlineStyle)
        return (
            <div staticClass='m-tab'>
                <div staticClass='m-tab__labels' class={labelsCls}>
                    <div staticClass='m-tab__label-underline' class={underLineCls} style={this.underlineStyle}></div>
                    {this._tabItems.map(item => {
                        const cls = {
                            ['m--active']: item.name === this.curTabName
                        }
                        return (
                            <div
                                data-tab-name={item.name}
                                class={cls}
                                staticClass='m-tab__label m--pointer'
                                onClick={() => this.setCurTab(item.name)}>
                                {item.label}
                            </div>
                        )
                    })}
                </div>
                <div staticClass='m-tab__content'>{this.$slots.default}</div>
            </div>
        );
    }
}

export default MTab;
