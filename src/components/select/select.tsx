import { Component, Vue, Prop, Emit, Provide, Watch } from 'vue-property-decorator'
import MInput from '@/components/text-field'
import MPopover from '@/components/popover'
import MChip from '@/components/chip'
import MOption from './opion'
@Component
export default class MSelect extends Vue {
  @Provide()
  private get root() {
    return this
  }

  @Prop()
  public value!: string | string[]

  @Provide()
  public searchVal: string = ''

  @Prop({// 多选
    type: Boolean,
  })
  public multiple!: boolean

  @Provide()
  @Prop({
    type: Boolean
  })
  public filerable!: boolean

  

  @Prop({// 是否使用chip展示
    type: Boolean,
  })
  private chips!: boolean

  

  private selectedOptions: MOption[] | MOption = []//  被选中的项

  public async select(option: MOption) {// 点击option调用
    const value = option.value
    if (this.multiple) {
      let result = [...this.value]
      if (this.value.includes(value)) {
        result = result.filter(v => v !== value)
        this.selectedOptions = this.selectedOptions.filter(o => o.value !== value)
      } else {
        result.push(value)
        this.selectedOptions.push(option)
      }
      this.$emit('input', result)
    } else {
      this.showPopover = false
      this.$emit('input', value)
      this.selectedOptions = option
    }
    await this.$nextTick()
    this.$refs.popover.setStyle()
  }





  private get inputVal() {// 用于输入框显示的值
    if (!Array.isArray(this.value)) {
      return this.value
    } else {
      return this.value.join(',')
    }
  }

  private showPopover = false

  private render(h) {
    const eventMap = { on: { 'update:show': (val: boolean) => this.showPopover = val } }
    let renderContent
    if (this.multiple && this.chips) {
      renderContent = this.selectedOptions.map(i => {
        return (
          <span>
            <MChip closetoggle variety="outline" closeable class='m--mr-md m--mb-xs' onClose={() => this.select(i)}>
              {i.$slots.default}
            </MChip>
          </span>
        )
      })

    } else if (this.chips && !this.multiple) {
      renderContent = (
        <span>
          <MChip closetoggle variety="outline" closeable class='m--mr-md m--mb-xs' onClose={() => this.select(selectedOptions)}>
            {selectedOptions.$slots.default}
          </MChip>
        </span>
      )
    } else {
      renderContent = this.inputVal
    }
    return (
      <div class='m__select'>
        <MPopover ref="popover" inherit-width={true} placement='top-end' {...eventMap} show={this.showPopover}>
          <MInput value={this.inputVal} read-only={true} end-icon='arrow_drop_down' slot='ref'>
            {renderContent}
            {/* 搜索框 */}
            {this.filerable && <input onInput={()=>{this.showPopover=true}} v-model={this.searchVal} staticClass='m--mr-md m--mb-xs' type="text" />}
          </MInput>
          <div class='m__select-list'>
            {this.$slots.default}
          </div>
        </MPopover>
      </div>
    )
  }
}
