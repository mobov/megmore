import { Component, Vue, Watch } from 'vue-property-decorator'
import { VNode } from 'vue'
import { on, off } from '@/utils/dom'
import Popover from '@/components/popover'

@Component
export default class MTooltip extends Vue {
  private popperVM: any
  private beforeCreate() {
    this.popperVM = new Vue({
      data: { node: '' },
      render(h) {
        return this.node as VNode;
      }
    }).$mount();
  }
  private mounted() {
    console.log(this.$el)
    on(this.$el, 'mouseenter', this.show);
    on(this.$el, 'mouseleave', this.hide);
  }
  private destroyed() {
    off(this.$el, 'mouseenter', this.show);
    off(this.$el, 'mouseleave', this.hide);
  }
  private show() { }
  private hide() { }
  private render() {
    return (
    <Popover>
      <div slot="ref">
      {this.$slots.default}
      </div>
    </Popover>
    )
    
  }
}