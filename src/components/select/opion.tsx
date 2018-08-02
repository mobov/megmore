import { Component, Vue, Prop, Emit, Inject } from 'vue-property-decorator'
import MCheckbox from '@/components/checkbox'
import MSelect from './select'
@Component
export default class MOption extends Vue {
  @Prop({
    required: true,
  })
  public value!: any

  @Prop({
    default: '',
  })
  public label!: any

  @Inject()
  private root!: MSelect

  private get checked() {
    const { value } = this.root
    if (Array.isArray(value)) {
      return value.includes(this.value)
    } else {
      return value === this.value
    }
  }

  private get multiple() {
    return this.root.multiple
  }

  private get selected() {
    return this.root.value
  }

  private get searchVal() {
    return this.root.searchVal
  }

  private get show() {
    console.log(this.label,this.root.searchVal)
    if (this.root.filerable) {
      return String(this.label).indexOf(this.root.searchVal) !== -1
    } else {
      return true
    }
  }

  private clickHandle = () => {
    this.root.select(this)
    console.log(this.selected)
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