import { Vue, Component, Prop } from 'vue-property-decorator'
import { FunctionalComponentOptions, RenderContext, VNode } from 'vue'
import { Model } from '@/types';
@Component({
 name: 'Render',
 functional:true,
} as FunctionalComponentOptions)
export default class Render extends Vue  {
 public context!: any
 public render(h, context: RenderContext) {
  return context.props.context(h)
 }
}
