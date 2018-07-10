import Vue, { PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions, RenderContext, VNode } from 'vue'
import { ENXIO } from 'constants';

export interface Megmore {
  install: PluginFunction<MegmoreUseOptions>
  version?: string
}
export default Megmore

export interface MegmoreUseOptions {
  components?: Record<string, PluginObject<any> | PluginFunction<never>>
  theme?: Partial<MegmoreTheme> | false
  icons?: Partial<MegmoreIcons> | false
  // options?: Partial<MegmoreOptions>
}

export namespace Model {//  各种数据模型
  export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'// 尺寸
  export type Type = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'default'//  颜色主题类型

  export type Color = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'default' | string //  颜色主题类型
  export type Variety = 'normal' | 'flat' | 'outline' //  类型变异
  export type Shape = 'square' | 'corner' | 'round' | 'circle' //  形状

  export interface ModalComponent extends Vue {// 模态框组件
    escPress: () => void,
    show: boolean,
    _value: boolean
  }
  export interface Component extends Vue {//  普通组件
    install: (Vue: VueConstructor) => void
  }
  export interface Render {
    (h: () => VNode, context: RenderContext): VNode
  }
  export interface ConfirmOptions {
    title?: string,
    content?: string | Render,
    type?: Model.Type
  }
}



