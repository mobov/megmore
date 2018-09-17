import {Component, Vue, Watch, Prop, Provide} from 'vue-property-decorator';
import * as Model from '@/types/model';
import {colorDetermine} from '@/utils/helpers';
import Render from '@/components/base/render'
import TabItem from './tab-item';

@Component
class MTab extends Vue {
    public tabItems: TabItem[] = [];
    public curTabName: string = '';
    public tabAnimationName: string = ''
    private underlineStyle = {}
    private


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

    private scrollable: boolean = false

    public setTabItemList(item: TabItem) {//
        if (this.tabItems.length === 0) {
            this.curTabName = item.name
        }
        this.tabItems.push(item);
    }

    @Watch('curTabName', {immediate: true})
    @Watch('value', {immediate: true})
    private async onNameChange(name: string) {
        this.$emit('input', name)
        this.curTabName = name
        await this.$nextTick()
        this.setUnderlineStyle()
        this.scrollable = (this.totalWidth > this.$el.getBoundingClientRect().width)
    }

    private get labelsColorData() {
        return colorDetermine(this.color, 'bg');
    }

    private get underLineColorData() {
        return colorDetermine(this.lineColor, 'bg');
    }


    private get _tabItems() {
        return this.tabItems.map(item => ({
            name: item.name,
            label: item.label
        }));
    }


    private get curIndex() {
        return this.tabItems.findIndex(item => item.name === this.curTabName)
    }

    private get tabPanelContainerStyle() {
        const offset = (this.curIndex) * 100
        return {
            transform: `translate3d(-${offset}%,0,0)`
        }
    }

    private get totalWidth() {
        if (this.$el) {
            const widths: number[] = [...this.$el.querySelectorAll('.m-tab__label')].map(el => {
                return el.getBoundingClientRect().width
            })
            return widths.reduce((a, b) => a + b)
        }
        return 0
    }


    private setUnderlineStyle() {
        if (this.$el) {
            const dom = this.$el.querySelector(`[data-tab-name=${this.curTabName}]`)
            const wrapDom = this.$el.querySelector('.m-tab__labels')
            const rect = (dom as HTMLElement).getBoundingClientRect()
            const wrapRect = (wrapDom as HTMLElement).getBoundingClientRect()
            let left = rect.left - wrapRect.left
            this.underlineStyle = {
                width: `${rect.width}px`,
                left: `${left}px`,
            }
        }
    }

    private setCurTab(name: string) {
        this.curTabName = name
    }

    private render() {
        const labelsCls = {
            ...this.labelsColorData.class,
        }
        const underLineCls = {
            ...this.underLineColorData.class
        }
        const labelContainerCls = {}
        const bgCls = {
            'm-tab__labels--scollable': this.scrollable,
        }
        return (
            <div staticClass='m-tab'>
                <div staticClass='m-tab__labels' class={labelsCls}>
                    <div staticClass='m-tab__label-underline' class={underLineCls} style={this.underlineStyle}></div>
                    {this.scrollable && [
                        (<div staticClass='m-tab__scroll-arrow m-tab__scroll-arrow--left'></div>),
                        (<div staticClass='m-tab__scroll-arrow m-tab__scroll-arrow--right'></div>),
                    ]}
                    <div staticClass='m-tab__labels-bg' class={bgCls}>
                        <div staticClass='m-tab__labels-container' class={labelContainerCls}>
                            {this._tabItems.map((item, index) => {
                                const cls = {
                                    ['m--active']: item.name === this.curTabName
                                }
                                const label = (typeof item.label === 'function') ? (
                                    <Render content={item.label}></Render>) : item.label
                                return (
                                    <div
                                        data-tab-name={item.name}
                                        class={cls}
                                        staticClass='m-tab__label m--pointer'
                                        onClick={() => this.setCurTab(item.name)}>
                                        {label}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div staticClass='m-tab__content' style={this.tabPanelContainerStyle}>
                    {this.$slots.default}
                </div>
            </div>
        );
    }
}

export default MTab;
