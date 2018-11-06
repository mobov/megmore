import { Component, Vue, Prop, Emit, Inject } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import toggleable from '@/mixins/toggleable'
import { addOnceEventListener } from '@/utils/dom'
import Icon from '@/components/icon'
import {MTransitionExpansion} from '@/components/transition'
@Component
export default class MExpansionPanelContent extends mixins(toggleable) {
  @Inject()
  public togglePanel!: (vm: MExpansionPanelContent) => void
  @Inject()
  public contentInit!: (vm: MExpansionPanelContent) => void
  @Inject()
  public contentRemove!: (vm: MExpansionPanelContent) => void

  /**
   * toggle
   */
  public toggle() {
    this.togglePanel(this)
  }
  private mounted() {
    this.contentInit(this)
  }

  private render(h) {
    const iconcls = this.visible
        ? 'm-expansion-panel-content__header-icon--active'
        : ''
    return (
      <div class='m-expansion-panel-content'   >
        <div v-m-ripple class='m-expansion-panel-content__header' onClick={this.toggle}>
          {this.$slots.header}
          {
            this.$slots.headerIcon
            ||
            (<Icon name='arrow_drop_down' class={`m-expansion-panel-content__header-icon ${iconcls}`}></Icon>)}
        </div>
        <MTransitionExpansion >
          <div class='m-expansion-panel-content__body' v-show={this.visible} >
            <div class='m-expansion-panel-content__body-content'  >
              {this.$slots.default}
            </div>
          </div>
        </MTransitionExpansion>
      </div>
    )
  }
}