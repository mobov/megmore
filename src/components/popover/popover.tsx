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
  @Prop({ type: Boolean })
  private inheritWidth!: boolean //  使用ref的宽度

  @Prop({
    type: String,
    default: 'bottom-end',
  })
  private placementY!: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'


  @Prop({
    type: String,
    default: 'right-start',
  })
  private placementX!: 'left' | 'left-start' | 'left-end' | 'right' | 'right-start ' | 'right-end'

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
  private getPositionLeft() {
    const { placementX: placement } = this

    let position: string// 位置以及位置修饰符
    let positionModify: string
    if (placement.indexOf('\-') !== -1) {
      position = placement.split('\-')[0]
      positionModify = placement.split('\-')[1]
    } else {
      position = placement
      positionModify = 'start'
    }

    const rect = this.refRect()
    const { left, width } = rect
    const { offsetWidth } = this.content
    let contentPositionLeft = left - offsetWidth
    if (position === 'left') {
      if (positionModify === 'start') {

      } else if (positionModify === 'end') {
        contentPositionLeft += width
      }
    }
    else if (position === 'right') {
      contentPositionLeft = left
      if (positionModify === 'start') {

      } else if (positionModify === 'end') {
        contentPositionLeft += width
      }
    }
    if (contentPositionLeft <= 0) {
      contentPositionLeft = 0
    } else if (contentPositionLeft + offsetWidth > window.innerWidth) {// 右侧超了屏幕
      contentPositionLeft = window.innerHeight - offsetWidth
    }
    return contentPositionLeft
  }
  private getPositionTop() {
    const { placementY: placement } = this

    let position: string// 位置以及位置修饰符
    let positionModify: string
    if (placement.indexOf('\-') !== -1) {
      position = placement.split('\-')[0]
      positionModify = placement.split('\-')[1]
    } else {
      position = placement
      positionModify = 'start'
    }

    const rect = this.refRect()
    const { height, top } = rect
    const { scrollHeight } = this.content
    let contentPositionTop = top - scrollHeight  //  弹窗底部对准内容头部 ，默认情况
    if (position === 'top') {// 弹窗在内容之上
      if (positionModify === 'start') {
        // contentPositionTop = top
      } else if (positionModify === 'end') {//  弹窗底部对准内容底部
        contentPositionTop += height
      }
    }
    else if (position === 'bottom') {
      contentPositionTop = top//  弹窗顶部对准内容头部
      if (positionModify === 'start') {// 默认情况

      } else if (positionModify === 'end') {//  弹窗顶部对准内容底部
        contentPositionTop = contentPositionTop + height
      }
    }
    if (contentPositionTop <= 0) {
      contentPositionTop = 0
    } else if (contentPositionTop + scrollHeight > window.innerHeight) {//  下方超出屏幕
      contentPositionTop = window.innerHeight - scrollHeight
    }
    return contentPositionTop
  }
  private setStyle() {
    const rect = this.refRect()
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
    const contentPositionTop = this.getPositionTop()
    const contentPositionLeft = this.getPositionLeft()
    // 将元素显示
    style.height = null
    style.boxShadow = null
    style.overflow = null
    let width:string = 'auto'
    if (this.inheritWidth) {
      width = rect.width+'px'
    }
    this.style = {
      left: `${contentPositionLeft}px`,
      top: `${contentPositionTop}px`,
      zIndex: getZIndex(),
      width,
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
