import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import modalMixin from '@/mixins/modal'
import * as Model from '@/types/model';
@Component
export default class MBottomSheet extends mixins(modalMixin) {
  public render(h:any) {
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