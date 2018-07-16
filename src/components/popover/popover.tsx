import { Component, Vue, Prop, Emit, Mixins, Watch } from 'vue-property-decorator'
import toggleable from '@/mixins/toggleable'
import { VNode } from 'vue'
import { on, off } from '@/utils/dom'
import { getZIndex } from '@/utils'

function clsPrefix(cls: string) {
 return `m-popover__${cls}`
}

const SuperCls = Mixins(toggleable)

@Component
export default class MPopover extends SuperCls {
 private style: any = {}
 private content!: Element
 @Watch('visible')
 public async visibleChangeHandle(val: boolean) {
  SuperCls.options.methods.visibleChangeHandle.call(this)
  await this.$nextTick()
  this.content = this.$refs.content as Element
  if (val) {
   this.showContent()
  } else {
   try {
    this.content.remove()
   } catch (error) {

   }
  }
 }
 private mounted() {
  this.showContent()
  on(this.ref, 'click', this.toggle)
  on(this.ref, 'scroll', () => {
   console.log(333)
  })
 }
 private beforeDestory() {
  off(this.ref, 'click', this.toggle)
  off(this.ref, 'scroll', this.setStyle)
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

 private refRect() {
  const rect = this.ref.getBoundingClientRect()
  console.log(rect)
  return rect
 }
 private setStyle() {
  const { left, top } = this.refRect()
  const style = {
   left: `${left}px`,
   top: `${top}px`,
   zIndex: getZIndex(),
  }

  this.style = style
 }
 private async showContent() {
  if (!this.visible) {
   return
  }
  await this.$nextTick()
  document.body.appendChild(this.content)
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
