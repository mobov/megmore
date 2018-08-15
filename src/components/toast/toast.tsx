import { Component, Vue, Watch } from 'vue-property-decorator'
import { getZIndex } from '@/utils';
import * as Model from '@/types/model'
import Icon from '../icon'
type ITypeIconMap = {
    [K in Model.Color]: string
}
const typeIconMap: ITypeIconMap = {//   类型图标对照表
    default: '',
    success: 'check',
    info: 'info_outline',
    warning: 'warning',
    danger: 'error',
    primary: '',
}

@Component
export default class MToast extends Vue {
    public visible: boolean = false
    public type: Model.Color = 'default'
    public message!: string
    public typeIconMap = typeIconMap
    constructor() {
        super()
    }
    public afterLeave() {
        this.$destroy()
        this.$el.remove()
    }

    private mounted() {
        if (this.visible) {
            document.body.appendChild(this.$el)
        }
    }

    private get wrapStyle() {
        const style = {
            zIndex: getZIndex(),
        }
        return style
    }

    private get contentCls() {
        let cls = `m--${this.type} `
        if (this.type !== 'default') {
            cls += `m--bg-${this.type}`
        }
        return cls
    }

    @Watch('visible')
    private visibleChangeHandle() {
        if (this.visible) {
            document.body.appendChild(this.$el)
        } else {

        }
    }

    private close() {
        this.visible = false
    }
    private get iconCls() {
        if (this.type === 'default') {
            return 'm--color-primary'
        } else {
            return ''
        }
    }
    private get iconName() {
        return this.typeIconMap[this.type]
    }
    private render() {
        console.log(this.iconName)
        return (
            <transition onAfterLeave={this.afterLeave} name='message'>
                <div v-show={this.visible} staticClass='m-message' class={this.contentCls} style={this.wrapStyle}>
                    {this.iconName && (
                        <Icon
                            onClick={this.close}
                            staticClass='m--pointer m--mr-md'
                            class={this.iconCls}
                            size='xs'
                            name={this.iconName}></Icon>
                    )}
                    <div staticClass='m-message__content'>
                        {this.message}
                    </div>
                    <Icon onClick={this.close} staticClass='m--pointer' class={this.iconCls} size='xs' name='close'></Icon>
                </div>
            </transition>
        )
    }
}