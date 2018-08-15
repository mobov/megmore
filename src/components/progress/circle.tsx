import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { getZIndex } from '@/utils';
import * as Model from '@/types/model'
import Icon from '../icon'
@Component
class MProgressCircle extends Vue {
  @Prop({
    type: Number,
    default: 32,
  })
  private size!: number

  // @Prop({
  //   type: Number,
  //   default: 40,
  // })
  private value: number=40

  private circleWidth: number = 5

  private get _value() {
    if (this.value < 0) {
      return 0
    }

    if (this.value > 100) {
      return 100
    }

    return this.value
  }

  private get radius() {
    return (this.size - this.circleWidth) / 2
  }

  private get center() {
    return this.size / 2
  }

  private get circumference() {// 周长
    return 2 * Math.PI * this.radius
  }

  private get strokeDashOffset() {//  内圈弧长
    return ((100 - this._value) / 100) * this.circumference + 'px'
  }


  private get strokeDashArray() {
    return Math.round(this.circumference * 1000) / 1000
  }

  private get wrapStyle() {
    return {
      height: `${this.size}px`,
      width: `${this.size}px`,
    }
  }

  private genCircle(name: string, offset: number = 5) {
    const cls = `m-progress-circle__${name}`
    return (
      <circle
        stroke-dashoffset={this.strokeDashOffset}
        class={cls} fill='transparent'
        stroke-dasharray={this.strokeDashArray}
        r={this.radius}
        stroke-width={this.circleWidth}
        cx={this.center}
        cy={this.center} >

      </circle>
    )
  }

  private render() {
    return (
      <div class='m-progress-circle' style={this.wrapStyle}>
        <svg>
          {this.genCircle('inner')}
        </svg>
      </div>
    )
  }
}
export default MProgressCircle
