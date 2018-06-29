import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import modalMixin from '@/mixins/modal'
import MIcon from '../icon'
import MButton from '../button'
import Render from '../render'
import { Model } from '@/types';
@Component
export default class MModal extends mixins(modalMixin) {
 @Prop({
  default: '',
 })
 public title!: string  // 标题

 @Prop({})
 public renderContent!: any
 @Prop({
  default: '',
 })
 public content!: string | Model.Render // 内容，可为render函数

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
   [this.fullscreen ? '' : 'width']: wType === 'number' ? `${this.width}px` : this.width,
   top: `${this.fullscreen ? 0 : this.top}px`,
  }
 }

 get transitionName() {
  return this.fullscreen ? 'modal-fullscreen-transition' : 'modal-transition'
 }

 @Emit()
 public confirm() {
  this.hide()
 }
 @Emit()
 public cancel() {
  this.hide()
 }
 public render(h) {
  const contentClass = `${this.fullscreen ? 'full-screen' : ''}`
  const { content } = this
  return (
   this.domExist && (
    <transition name={this.transitionName} onAfterLeave={this.afterLeave}>
     <div staticClass='m-modal' v-show={this.selfShow}>
      {!this.fullscreen && (
       <div staticClass='m-modal--wrap' onClick={this.hide} >
       </div>
      )}
      <div staticClass='m-modal--content' class={contentClass} style={this.style}>
       <div class='m-modal--title'>
        {this.$slots.title || this.title}
       </div>
       <m-icon name='close' onClick={this.hide}>X</m-icon>
       <div class='m-modal--body'>
        {typeof content === 'function' ? (<Render context={content}></Render>) : this.$slots.default || this.content}
       </div>
       {this.$slots.footer || (
        <div class='m-modal--footer'>
         <m-button onClick={this.cancel}>
          取消
         </m-button>
         <m-button onClick={this.confirm}>
          确认
         </m-button>
        </div>
       )}
      </div>
     </div>
    </transition>
   )
  )
 }
}