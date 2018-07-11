/**
 * @description 基础组件，穿入context
 */
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FunctionalComponentOptions, RenderContext, VNode } from 'vue'
import { Model } from '@/types';
@Component({
  name: 'Render',
  functional: true,
} as FunctionalComponentOptions)
export default class Render extends Vue {
  @Prop({
    type: [Function, String]
  })
  public content!: VNode | string
  public render(h, context: RenderContext) {
    return context.props.content(h)
  }
}
