import { Component, Prop, Vue } from 'vue-property-decorator'
import MIcon from '../icon'
import { VNode } from 'vue'
import { isHexColor, isStyleUnit } from 'es-treasure'

const name = 'MButton'
const prefix = 'm-button'

@Component({
    name,
    components: { MIcon },
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
  console.log(this)

  return (
   <button staticClass={prefix}
           class={`${this.size} ${this.type} ${this.round ? 'round' : ''}`}
           onClick={this.handleClick}
   >
    <m-icon />
    {this.$slots.default}
   </button>
  )
 }

 private handleClick(e: MouseEvent) {
    console.log(e)
  this.$emit('click', e)
 }
}
