import { Component, Vue, Prop, Emit, Provide, Watch } from 'vue-property-decorator'
import MInput from '@/components/text-field'
import MPopover from '@/components/popover'
import MChip from '@/components/chip'
import MOption from './opion'
@Component
export default class MSelect extends Vue {
  public $refs!: {
    popover: MPopover,
  }

  @Provide()
  private get root() {
    return this
  }

  private get selected() {
    if (this.multiple) {
      return this.optionsList.filter(o => this.value.includes(o.value))
    } else {
      return [this.optionsList.find(o => o.value === this.value)]
    }
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
    type: Boolean,
  })
  public filerable!: boolean



  @Prop({// 是否使用chip展示
    type: Boolean,
  })
  private chips!: boolean

  private showPopover = false// 下拉框显示控制

  private selectedOptions: MOption[] = []//  被选中的项





  public async select(option: MOption) {// 点击option调用
    const value = option.value
    if (this.multiple) {
      if (this.value.includes(value)) {// 如果选中，再次点击就去掉勾选
        this.selectedOptions.filter(v => v.value !== value)
      } else {
        this.selectedOptions.push(option)
      }
      const result = this.selectedOptions.map(o => o.value)
      this.$emit('input', result)
    } else {
      if (this.value === value) {// 如果选中，再次点击就去掉勾选
        this.selectedOptions = []
        this.$emit('input', '')
      } else {
        this.showPopover = false
        this.$emit('input', value)
        this.selectedOptions = [option]
      }
    }
    await this.$nextTick()
    try {
      this.$refs.popover.setStyle()
    } catch (error) {

    }
  }

  private clear(e: MouseEvent) {
    this.searchVal = ''
    this.showPopover = false
    if (this.multiple) {
      this.$emit('input', [])
    } else {
      this.$emit('input', '')
    }
    this.selectedOptions = []
  }



  private get inputVal() {// 用于输入框显示的值
    if (!Array.isArray(this.value)) {
      return this.value
    } else {
      return this.value.join(',')
    }
  }


  private render(h) {
    const eventMap = { on: { 'update:show': (val: boolean) => this.showPopover = val } }
    let renderContent
    if (this.chips) {
      renderContent = this.selectedOptions.map(i => {
        return (
          <span>
            <MChip
              closetoggle
              variety='outline'
              closeable
              class='m--mr-md m--mb-xs'
              onClose={() => this.select(i)}>
              {i.$slots.default}
            </MChip>
          </span>
        )
      })

    } else {
      renderContent = this.inputVal
    }
    return (
      <div class='m__select'>
        <MPopover ref="popover" inherit-width={true} placement='top-end' {...eventMap} show={this.showPopover}>
          <MInput
            label="select"
            value={this.inputVal}
            read-only={true}
            end-icon='arrow_drop_down'
            slot='ref'
            onClear={this.clear} >
            {renderContent}
            {/* 搜索框 */}
            {this.filerable &&
              <input
                onInput={() => { this.showPopover = true }}
                v-model={this.searchVal}
                staticClass='m--mr-md m--mb-xs'
                type='text' />}
          </MInput>
          <div class='m__select-list'>
            {this.$slots.default}
          </div>
          <div></div>
        </MPopover>
      </div>
    )
  }
}
