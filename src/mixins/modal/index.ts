import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch, Mixins } from 'vue-property-decorator'
import manage from '@/mixins/modal/modalManage'
import { getZIndex } from '@/utils'
import { openOverlay } from '@/methods/overlay'
import toggleable from '../toggleable'
/**
 * 弹窗控制通用mixin
 */
@Component
export default class ModalMixin extends Mixins(toggleable) {
  @Prop({
    default: '标题',
    type: String,
  })
  public title!: string// 控制显示隐藏

  @Prop({
    default: false,
  })
  public fullscreen!: boolean// 全屏模式

  @Prop({
    default: true,
  })

  public escPressClose!: boolean



  protected zIndex = getZIndex()


  get dom(): HTMLElement {
    return this.$el
  }
  public beforeEnter() {
    console.log(this.$el)
    document.body.appendChild(this.$el);
  }
  public afterLeave() {
    this.$el.remove()
  }
  public setZIndex() {
    const dom = this.$el
    this.zIndex = getZIndex()
    if (dom && dom.style) {
      dom.style.zIndex = String(this.zIndex)
    }
  }
  public escPress() {
    if (!this.escPressClose || !this.visible) {
      return
    }
    this.visible = false
  }
  public closeLastModal() {
    manage.closeLast()
  }
  public eveStop(e: Event) {
    e.stopPropagation()
  }
  @Watch('show', { immediate: true })
  @Watch('visible', { immediate: true })
  public async visibleChangeHandle(val: boolean, oldVal: boolean) {
    this.$emit('update:show', val)
    if (val) {
      await this.$nextTick()//  确保dom已经插入再进行显示
      this.setZIndex()
      manage.open(this)
      openOverlay()
    } else {
      manage.close(this)
    }
    this.visible = val
  }
  protected beforeDestroy() {
    this.$el.remove()
  }
  private async mounted() {
    this.$el.remove()
  }


}
