import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { VNode } from 'vue'
import { mixins } from 'vue-class-component'
import modalMixin from '@/mixins/modal'
@Component
export default class MDrawer extends mixins(modalMixin) {
  public render(h) {
    return (
      this.domExist && (
        <transition name='m-drawer' onAfterLeave={this.afterLeave} >
          <div class='m-drawer__wrap' onClick={this.closeLastModal} v-show={this.visible} >
            <div staticClass='m-drawer__content'onClick={this.eveStop}></div>
          </div>
        </transition>
      )
    )
  }
}