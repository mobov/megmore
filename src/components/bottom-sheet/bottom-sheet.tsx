import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { VNode } from 'vue'
import { mixins } from 'vue-class-component'
import modalMixin from '@/mixins/modal'
import MIcon from '@/components/icon'
import Render from '@/components/render'
import { Model } from '@/types';
import Overlay from '@/components/base/overlay'
@Component
export default class MBottomSheet extends mixins(modalMixin) {
  public render(h) {
    return (
      this.domExist && (
        <transition name='m-bottom-sheet' onAfterLeave={this.afterLeave} >
          <div class='m-bottom-sheet__wrap' onClick={this.closeLastModal} v-show={this.visible} >
            <div staticClass='m-bottom-sheet__content'onClick={this.eveStop}></div>
          </div>
        </transition>
      )
    )
  }
}