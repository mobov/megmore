import { Component, Vue, Watch, Prop, Provide } from 'vue-property-decorator';
import * as Model from '@/types/model';
import { colorDetermine } from '@/utils/helpers';
import Render from '@/components/base/render'
import TabItem from './tab-item';

@Component
class MTab extends Vue {
    public tabItems: TabItem[] = [];
    public curTabName: string = '';
    public tabAnimationName: string = ''
    private underlineStyle = {}
    private containerOffset: number = 0
    private labelContainerOffset = 0

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

    @Watch('curTabName', { immediate: true })
    @Watch('value', { immediate: true })
    private async onNameChange(name: string) {
        this.$emit('input', name)
        this.curTabName = name
        await this.$nextTick()
        this.setUnderlineStyle()
        this.scrollable = (this.totalWidth > this.$el.getBoundingClientRect().width)
    }

    @Watch('labelContainerOffset')
    private handleLabelContainerOffsetChange(now: number, before: number) {
        this.setUnderlineStyle(now - before)
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

    private get labelContainerStyle() {
        return {
            transform: `translate3d(-${this.labelContainerOffset}px,0,0)`
        }
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
    /**
     * 点击左右两侧滚动指示器时触发
     * @param direction 方向
     */
    private scrollLabelContainer(direction: string) {
        if (!this.$el) {
            return this.labelContainerOffset = 0
        }
        const labels = [...this.$el.querySelectorAll('.m-tab__label')]

        //  偏移的tablabel数量
        const containerOffset = direction === 'left' ? this.containerOffset - 1 : this.containerOffset + 1
        //  偏移的label宽度总量
        let offset = labels.filter((t, i) => i < containerOffset).map(tab => {
            try {
                return tab.getBoundingClientRect().width
            } catch (e) {
                return 0
            }
        }, 0).reduce((a, b) => a + b, 0)

        const bgEl = this.$el.querySelector('.m-tab__labels-bg')
        const bgElRect = bgEl.getBoundingClientRect()

        const container = this.$el.querySelector('.m-tab__labels-container')
        const containerRect = container.getBoundingClientRect()

        const margin = bgEl.style.marginLeft
        const leftLimit = bgElRect.left + margin
        const rightLimit = bgElRect.right + margin
        //  最👈rect边界
        const attachLeftLimit = containerRect.left + offset >= leftLimit
        //  最👉rect边界
        const attachRightLimit = containerRect.right - offset <= rightLimit
        if (direction === 'left') {
            if (attachLeftLimit) {
                //  到达边界不再进行偏移
                return this.labelContainerOffset = 0
            } else {
                //  偏移标记数-1
                this.containerOffset--
            }
        }
        if (direction === 'right') {
            if (attachRightLimit) {
                //  最👉偏移量
                offset = containerRect.width - bgElRect.width
                return this.labelContainerOffset = offset
            } else {
                //  偏移标记数+1
                this.containerOffset++
            }
        }
        this.labelContainerOffset = offset

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

    /**
     * 设置下划线偏移位置和宽度
     * @param isScroll 滚动时调用
     */
    private setUnderlineStyle(offset: number = 0) {
        if (this.$el) {
            // 目标dom
            const dom = this.$el.querySelector(`[data-tab-name=${this.curTabName}]`)
            const wrapDom = this.$el.querySelector('.m-tab__labels')
            const rect = (dom as HTMLElement).getBoundingClientRect()
            const wrapRect = (wrapDom as HTMLElement).getBoundingClientRect()
            let left = rect.left - wrapRect.left
            left = left - offset
            this.underlineStyle = {
                width: `${rect.width}px`,
                left: `${left}px`,
            }
        }

    }

    private setCurTab(name: string) {
        this.curTabName = name
    }

    private async scrollTo(direction: string) {
        if (direction === 'left') {
            this.containerOffset !== 0 && this.containerOffset--
        } else {
            this.containerOffset !== (this.tabItems.length - 1) && this.containerOffset++
        }
        this.scrollLabelContainer(direction)
        await this.$nextTick()
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
                        (<div staticClass='m-tab__scroll-arrow m-tab__scroll-arrow--left m--pointer'
                            onClick={() => this.scrollLabelContainer('left')}></div>),
                        (<div staticClass='m-tab__scroll-arrow m-tab__scroll-arrow--right m--pointer'
                            onClick={() => this.scrollLabelContainer('right')}></div>),
                    ]}
                    <div staticClass='m-tab__labels-bg' class={bgCls}>
                        <div staticClass='m-tab__labels-container' class={labelContainerCls}
                            style={this.labelContainerStyle}>
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
                <div staticClass='m-tab__content-container'>
                    <div staticClass='m-tab__content' style={this.tabPanelContainerStyle}>
                        {this.$slots.default}
                    </div>
                </div>
            </div>
        );
    }
}

export default MTab;
