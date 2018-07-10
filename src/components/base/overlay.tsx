/**
 * @description 基础组件，穿入context
 */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { FunctionalComponentOptions, RenderContext, VNode } from 'vue'
import { Model } from '@/types';
import { mixins } from 'vue-class-component'
import modalMixin from '@/mixins/modal'
import modalManage from '@/mixins/modal/modalManage'
@Component({
  name: 'MOverlay',
})
export default class Overlay extends Vue {
  public show = false// 控制显示隐藏
  public beforeDestroy() {
    this.$el.remove()
  }
  public render(h, context: RenderContext) {
    return (
      <transition name='overlay' onAfterLeave={this.hide}>
        <div v-show={this.show} class='m-overlay' onClick={modalManage.closeLast}></div>
      </transition>
    )
  }
  private async mounted() {
    document.body.appendChild(this.$el)
  }
  private async hide() {
    this.$destroy()
  }
}
