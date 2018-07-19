import { Component, Vue, Prop, Emit, Provide } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import toggleable from '@/mixins/toggleable'
import Content from './expansion-panel-content'
@Component
export default class MExpansionPanel extends Vue {
  public contents: Content[] = []
  @Provide()
  public togglePanel(vm: Content) {
    console.log(vm)
    this.contents.forEach((item: Content) => {
      if (item === vm) {
        vm.visible = !vm.visible
      } else {
        item.visible = false
      }
    })
  }
  @Provide()
  public contentInit(vm: Content) {
    this.contents.push(vm)
  }
  @Provide()
  public contentRemove(vm: Content) {
    this.contents = this.contents.filter(item => item !== vm)
  }
  public render(h) {
    return (
      <div class='m-expansion-panel elevation-2' >
        {this.$slots.default}
      </div>
    )
  }
}
