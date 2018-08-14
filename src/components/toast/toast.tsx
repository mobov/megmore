import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { VNode } from 'vue'
import { mixins } from 'vue-class-component'
import modalMixin from '@/mixins/modal';
import { getZIndex } from '@/utils';
import * as Model from '@/types/model'
import Icon from '../icon'

@Component
export default class MToast extends Vue {
    public visible: boolean = false
    public type: Model.Color = 'default'
    public message!: string
    public afterLeave() {
        this.$destroy()
        this.$el.remove()
    }

    private mounted() {
        if (this.visible) {
            document.body.appendChild(this.$el)
        }
    }

    private get cls() {
        return `
                    m--${this.type}
                `
    }

    @Watch('visible')
    private visibleChangeHandle() {
        if (this.visible) {
            document.body.appendChild(this.$el)
        }else{

        }
    }

    private close() {
        this.visible = false
    }
   
    private render() {
        return (
            <transition onAfterLeave={this.afterLeave} name='message'>
                <div v-show={this.visible} staticClass='m-message' class={this.cls}>
                    <div staticClass='m-message__content'>
                        {this.message}
                    </div>
                    <Icon onClick={this.close} class='m--pointer' size='xs' name='close'></Icon>
                </div>
            </transition>
        )
    }
}