import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import toggleable from '@/mixins/toggleable'
@Component
export default class MExpansionPanel extends mixins(toggleable) {
  public render(h) {
    return (
      <div class='m-expansion-panel elevation-2' >
        {this.$slots.default}
      </div>
    )
  }
}