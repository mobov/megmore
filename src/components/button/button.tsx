import { FunctionalComponentOptions } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { isHexColor, isStyleUnit } from 'es-treasure'



@Component({

})
export default class MButton extends Vue {
 @Prop({
  type: String,
  default: 'md',
 })
 private size!: Model.Size

 @Prop({
  type: String,
  default: 'default',
 })
 private type!: Model.Type

 @Prop({
  type: Boolean,
 })
 private round = false

 public render(): VNode {
  return (
   <button class={`m-button ${this.size} ${this.type} ${this.round ? 'round' : ''}`} onClick={this.handleClick}>
    <div className="m-spin"></div>
    {this.$slots.default}
   </button>
  )
 }

 private handleClick(e: MouseEvent) {
  this.$emit('click', e)
 }
}
