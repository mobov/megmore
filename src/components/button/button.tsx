import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import { isHexColor, isStyleUnit } from 'es-treasure'

const name = 'MButton'
const prefix = 'm-button'

@Component({
    name
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
   <button staticClass={prefix}
           class={`m-button ${this.size} ${this.type} ${this.round ? 'round' : ''}`}
           onClick={this.handleClick}
   >
    {/*className不会起作用*/}
    <div class="m-spin"/>
    {this.$slots.default}
   </button>
  )
 }

 private handleClick(e: MouseEvent) {
  this.$emit('click', e)
 }
}
