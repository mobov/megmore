import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
/**
 * 可切换显示隐藏组件mixin
 */
@Component
export default class ModalMixin extends Vue {
  @Prop({
    default: false,
  })
  public show!: boolean// 控制显示隐藏

  public visible = false// 组件内部的显示隐藏状态
  public hide() {
    this.visible = false
  }
  public toggle() {
    this.visible = !this.visible
  }

  @Watch('show', { immediate: true })
  @Watch('visible', { immediate: true })
  public async visibleChangeHandle(val: boolean, oldVal: boolean) {
    this.$emit('update:show', val)
    this.visible = val
  }
}
