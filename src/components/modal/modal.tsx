import { Component, Vue, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import modalMixin from '@/mixins/modal'


@Component
export default class MModal extends mixins(modalMixin) {

 @Prop({
  default: 600,
  type: [String, Number]
 })
 private width!: number | string

 @Prop({
  default: 50,
 })
 private top!: number  // 弹窗距离顶部高度

 get style() {
  const wType = typeof this.width
  return {
   width: wType === 'number' ? `${this.width}px` : this.width,
   top: `${this.top}px`,
  }
 }

 public hide() {
  this._value = false
 }

 public render() {
  return (
   <transition name='modal-transition'>
    <div class='m-modal' v-show={this.value} >
     <div class='m-modal-wrap' onClick={this.hide}>
      <div class='m-modal-content' style={this.style}></div>
     </div>
    </div>
   </transition>
  )
 }
}