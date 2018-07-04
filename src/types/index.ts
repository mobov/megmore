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
  export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'hg'// 尺寸
  export type Type = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'default'//  主题类型
  export interface ModalComponent extends Vue {// 模态框组件
    escPress: () => void
  }
  export interface Component extends Vue {//  普通组件
    install: (Vue: VueConstructor) => void
  }
  export interface Render {
    (h: () => VNode, context: RenderContext): VNode
  }
  export interface ConfirmOptions {
    title?: string,
    content?: string |  Render,
    type?: Model.Type
  }
}



