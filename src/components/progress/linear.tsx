import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { getZIndex } from '@/utils';
import * as Model from '@/types/model'
import Icon from '../icon'
import { isColor } from '@/utils/helpers'
@Component
class MProgressLinear extends Vue {

  @Prop({
    type: Number,
    default: 80,
  })
  private value!: number

  @Prop({
    type: String,
    default: 'primary',
  })
  private color!: Model.Color

  @Prop({
    type: String,
    default: 'primary',
  })
  private backgroundColor!: Model.Color

  @Prop({
    type: Number,
    default: 10,
  })
  private height!: number

  @Prop({
    type: Boolean,
    default: true,
  })
  private indeterminate!: boolean


  private render() {
    const wrapCls = {
      [isColor(this.backgroundColor) ? `` : `m--bg-${this.backgroundColor} m-progress-linear__wrap--with-bg`]: true,
    }
    const innerCls = {
      [isColor(this.color) ? `` : `m--bg-${this.color}`]: true,
      'm-progress-linear__inner--indeterminate': this.indeterminate,
    }
    const wrapStyle = {
      height: `${this.height}px`,
      backgroundColor: isColor(this.backgroundColor) ? `${this.backgroundColor}` : '',
    }
    const innerStyle = {
      width: `${this.value}%`,
      backgroundColor: isColor(this.color) ? `${this.color}` : '',
    }
    return (
      <div staticClass='m-progress-linear' style={wrapStyle}>
        <div staticClass='m-progress-linear__wrap' class={wrapCls}>
        </div>
        <div staticClass='m-progress-linear__inner' class={innerCls} style={innerStyle}>
        </div>
      </div>
    )
  }
}
export default MProgressLinear
