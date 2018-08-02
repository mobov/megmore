import { Component, Vue, Prop, Emit, Provide } from 'vue-property-decorator'
import MInput from '@/components/text-field'
import MPopover from '@/components/popover'
import Option from './opion'
@Component
export default class MSelect extends Vue {

  private value: string | string[] = ''

  @Prop({
    type: Boolean
  })
  @Provide()
  private multiple!: boolean

  @Provide()
  private select(val) {// 点击option调用
    this.showPopover = false
    this.value = val
  }


  @Provide('selected')
  private get inputVal() {// 用于输入框显示的值
    if (typeof this.value === 'string') {
      return this.value
    } else {
      return this.value.join(',')
    }
  }

  private showPopover = false

  private render(h) {
    const eventMap = { on: { 'update:show': (val: boolean) => this.showPopover = val } }
    return (
      <div class='m__select'>
        <MPopover inherit-width={true} placement='top-end' {...eventMap} show={this.showPopover}>
          <MInput value={this.inputVal} read-only={true} end-icon='arrow_drop_down' slot='ref'></MInput>
          <div class='m__select-list'>
            {this.$slots.default}
          </div>
        </MPopover>
      </div>
    )
  }
}
