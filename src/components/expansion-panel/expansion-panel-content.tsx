import { Component, Vue, Prop, Emit, Inject } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import toggleable from '@/mixins/toggleable'
import { addOnceEventListener } from '@/utils/dom'
import Icon from '@/components/icon'
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
  private beforeDestory() {
    this.contentRemove(this)
  }
 


  private async enter(el: HTMLElement, done: () => void) {
    el.style.overflow = 'hidden'
    el.style.height = '0'
    el.style.display = 'block'
    addOnceEventListener(el, 'transitionend', done)

    // el.style.height = String(el.offsetHeight) + 'px'
    console.log(el.scrollHeight)
    el.style.height = `${el.scrollHeight}px`

  }
  private leave(el, done) {
    // Remove initial transition
    addOnceEventListener(el, 'transitionend', done)

    // Set height before we transition to 0
    el.style.overflow = 'hidden'
    el.style.height = `${el.offsetHeight}px`
    setTimeout(() => (el.style.height = 0), 100)
    // Promise.resolve().then(() => {
    //   el.style.height = 0
    // })
  }
  private afterEnter(el: HTMLElement) {
    el.style.display = null
    el.style.height = null
    el.style.overflow = null
    console.log(el.style)
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
        <transition name='m-expansion-panel' onEnter={this.enter} onAfterEnter={this.afterEnter} onLeave={this.leave}>
          <div class='m-expansion-panel-content__body' v-show={this.visible} >
            <div class='m-expansion-panel-content__body-content'  >
              {this.$slots.default}
            </div>
          </div>
        </transition>
      </div>
    )
  }
}