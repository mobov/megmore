<script lang="ts">
import { FunctionalComponentOptions} from 'vue'
import { Component, Prop, Vue} from "vue-property-decorator";
import { isHexColor, isStyleUnit } from "es-treasure";
const prefix = "m-avatar";
const sizeMap = ["xs", "sm", "md", "lg", "hg"];

@Component({
  functional:true
} as FunctionalComponentOptions)
export default class MAvatar extends Vue {
  name = "MAvatar";
  @Prop({
    type:[String,Number],
    default: "sm"
  })
  private size! :string|number;
  @Prop({
    type:[String],
    default: "#000000"
  })
  private color!:string
  @Prop({
    type:[String],
    default: "#ffffff"
  })
  private bgColor!:string
  @Prop({
    type:[Number],
    default: 0
  })
  private shadow!:number
  render(h: any, { data, props, children }:Model.renderParam) {
    const { size, bgColor, color, shadow } = props;
    data.staticClass = `${prefix} ${data.staticClass || ""} `;
    data.style = data.style || {};

    if (sizeMap.indexOf(size)) {
      data.staticClass += `${size} `;
    } else if (isStyleUnit(size)) {
      Object.assign(data.style, {
        height: size,
        width: size
      });
    }

    if (isHexColor(bgColor)) {
      Object.assign(data.style, {
        backgroundColor: bgColor
      });
    } else {
      data.staticClass += `bg-${bgColor} `;
    }

    if (isHexColor(color)) {
      Object.assign(data.style, {
        color
      });
    } else {
      data.staticClass += `color-${color} `;
    }
    data.staticClass = data.staticClass.trim();
    return h("div", data, children);
  }
}

</script>
