import Vue, { PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions, RenderContext, VNode } from 'vue'
import { ENXIO } from 'constants';

declare module 'vue/types/vue' {
  interface VueConstructor {
    install(Vue: VueConstructor): void // 为组件构造函数添加一个install方法以单独引用
    register(data: any): void
  }
  interface Vue {
    $confirm: () => Promise<any>
  }
}

declare const Megmore: Megmore
export default Megmore
export interface Megmore {
  install: PluginFunction<MegmoreUseOptions>
  version?: string
}


}

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


declare global {
  
  interface Window {
    Vue: VueConstructor
  }
}
