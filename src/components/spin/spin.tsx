import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { FunctionalComponentOptions } from 'vue'
import { Model } from '@/types';
@Component({
 functional: true,
} as FunctionalComponentOptions)
export default class MSpin extends Vue {
 @Prop({
  type: String,
  default: 'sm',
 })
 public size!: Model.Size

 @Prop({
  type: String,
  default: '',
 })
 public color!: string

 public render(createElement: any, context: any) {
  return (
   <div class={`m-spin__wrap m--${context.props.size}`}>
    <svg class='m-spin__content' viewBox='25 25 50 50' >
     <circle style={{ stroke: context.props.color }} cx='50' cy='50' r='20' fill='none' stroke-width='5' stroke-miterlimit='10' class='m-spin__path'></circle>
    </svg>
   </div>
  )
 }
}
