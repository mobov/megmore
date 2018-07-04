import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import manage from './modalManage'
import { getZIndex } from '@/utils'
// You can declare a mixin as the same style as components.
@Component
export default class ModalMixin extends Vue {
  @Prop({
    default: false,
  })
  public show!: boolean// 控制显示隐藏

  @Prop({
    default: false,
  })
  public fullscreen!: boolean// 全屏模式

  @Prop({
    default: true,
  })
  public escPressClose!: boolean

  public domExist = false//  添加或移除BODY层dom

  public visible = false// 组件内部的显示隐藏状态

  protected zIndex = getZIndex()

  get _value(): boolean {
    return this.show
  }
  set _value(val: boolean) {
    this.visible = val
    this.$emit('update:show', val)
  }

  get dom(): HTMLElement {
    return this.$el
  }
  public hide() {
    this._value = false
  }
  public afterLeave() {
    this.domExist = false
  }
  public setZIndex() {
    const dom = this.$el
    this.zIndex = getZIndex()
    if (dom && dom.style) {
      dom.style.zIndex = String(this.zIndex)
    }
  }
  public escPress() {
    if (!this.escPressClose || !this._value) {
      return
    }
    this._value = false
  }
  protected beforeDestroy() {
    this.domExist = false
    this.$el.remove()
  }
  private async mounted() {
    document.body.appendChild(this.$el)
  }

  @Watch('_value', { immediate: true })
  private async visibleChangeHandle(val: boolean, oldVal: boolean) {
    this.visible = val
    if (val) {
      this.domExist = val
      await this.$nextTick()
      this.setZIndex()
      manage.open(this)
    } else {
      manage.close(this)
    }
  }
}
