import { Component, Vue, Prop, Emit, Inject } from 'vue-property-decorator'
import MCheckbox from '@/components/checkbox'

@Component
export default class MOption extends Vue {
  @Inject()
  private select!: (val: any) => void

  @Inject()
  private selected!: any

  @Inject()
  private multiple!: boolean

  @Prop({
    required: true,
  })
  private value!: any

  get checked() {
    console.log(this.selected)
    return false
  }


  public render() {
    return (
      <div class='m__option' onClick={() => this.select(this.value)}>
        <MCheckbox value={this.checked}></MCheckbox>
        <div class='m__option-content'>
          {this.$slots.default}
        </div>
      </div>
    )
  }
}