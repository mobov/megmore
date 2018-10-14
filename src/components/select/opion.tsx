import { Component, Vue, Prop, Emit, Inject } from 'vue-property-decorator'
import MCheckbox from '@/components/checkbox'
import MSelect from './select'

let id = 0  //  option唯一标识id

@Component
export default class MOption extends Vue {
  @Prop({
    required: true,
  })
  public value!: any

  public id = id++

  @Prop({
    default: '',
  })
  public label!: any

  @Inject({
    from: '_select',
  })
  private select!: MSelect

  private get checked() {
    const { value } = this.select
    if (Array.isArray(value)) {
      return value.includes(this.value)
    } else {
      return value === this.value
    }
  }

  private get multiple() {
    return this.select.multiple
  }

  private get selected() {
    return this.select.value
  }

  private get searchVal() {
    return this.select.searchVal
  }

  private get show() {
    if (this.select.filerable) {
      return String(this.label).indexOf(this.searchVal) !== -1
    } else {
      return true
    }
  }

  private clickHandle = () => {
    this.select.select(this)
    console.log(this.selected)
  }

  private mounted() {
    // this.root.addOption(this)
  }
  private beforeDestroy() {
    // this.root.removeOption(this)
  }
  private render() {
    const cls = {
      'm--color-primary': this.checked,
      'm--active': this.checked,
    }
    return (
      <div v-m-ripple staticClass='m__option' class={cls} onClick={this.clickHandle} v-show={this.show}>
        {this.multiple && <MCheckbox label={true} value={this.checked}></MCheckbox>}
        <div staticClass='m__option-content'>
          {this.$slots.default}
        </div>
      </div>
    )
  }
}