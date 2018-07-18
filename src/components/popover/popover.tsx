import { Component, Vue, Prop, Emit, Mixins, Watch } from 'vue-property-decorator'
import toggleable from '@/mixins/toggleable'
import { VNode } from 'vue'
import { on, off, getScrollEventTarget } from '@/utils/dom'
import { getZIndex } from '@/utils'

function clsPrefix(cls: string) {
 return `m-popover__${cls}`
}

const SuperCls = Mixins(toggleable)

@Component
export default class MPopover extends SuperCls {
 private style: any = {}
 private content!: HTMLDivElement
 @Watch('visible')
 public async visibleChangeHandle(val: boolean, before: boolean) {
  SuperCls.options.methods.visibleChangeHandle.call(this)
  await this.$nextTick()
  this.content = this.$refs.content as HTMLDivElement
  if (val) {
   this.showContent()
  } else {
   off(this.scoller, 'scroll', this.setStyle)// 滚动事件解绑
  }
 }
 private mounted() {
  this.showContent()
  on(this.ref, 'click', this.toggle)
 }
 private beforeDestory() {
  off(this.ref, 'click', this.toggle)
  off(this.scoller, 'scroll', this.setStyle)
 }
 private get ref() {
  const ref = this.$slots.ref[0]
  let dom
  if (ref.context && ref.context._isVue) {
   dom = ref.elm
  } else {
   dom = ref
  }
  return dom as Element
 }

 private get scoller() {
  return getScrollEventTarget(this.ref)
 }
 private refRect() {
  const rect = this.ref.getBoundingClientRect()
  return rect
 }
 private getTop() {
  const { top } = this.refRect()
  return top
 }
 private getLeft() {
  const { left } = this.refRect()
  return left
 }
 private setStyle() {
  const rect = this.refRect()
  let { left, top } = rect
  if (rect.top < -rect.height || rect.top > window.innerHeight) {// ref元素滑到屏幕之外时
   this.hide()
  }

  const { style } = this.content
  // 隐藏元素
  style.height = '0'
  style.boxShadow = 'none'
  style.overflow = 'hidden'
  // 计算位置
  const { scrollHeight, offsetWidth } = this.content
  const refPositionTop = top + scrollHeight
  const refPositionLeft = left + offsetWidth
  if (refPositionTop > window.innerHeight) {
   top = window.innerHeight - scrollHeight
  } else if (top <= 0) {
   top = 0
  }
  if (refPositionLeft > window.innerWidth) {
   left = window.innerWidth - offsetWidth
  } else if (left <= 0) {
   left = 0
  }
  // 将元素显示
  style.height = null
  style.boxShadow = null
  style.overflow = null
  this.style = {
   left: `${left}px`,
   top: `${top}px`,
   zIndex: getZIndex(),
  }

 }



 private async showContent() {
  if (!this.visible) {
   return
  }
  document.body.appendChild(this.content)
  on(this.scoller, 'scroll', this.setStyle)
  this.setStyle()
 }
 private render() {
  return (
   <div class='m-popover' v-m-click-outside={this.hide}>
    <transition name='m-popover'>
     {this.visible && (
      <div v-m-click-outside={this.hide} ref='content' class={`${clsPrefix('content')}`} style={this.style}>
       {this.$slots.default}
      </div>
     )}
    </transition>
    {this.$slots.ref}
   </div>
  )
 }
}
