import Vue, { PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions, ComponentOptions, RenderContext, VNode } from 'vue'
import { ENXIO } from 'constants';

declare module 'vue/types/vue' {
  interface VueConstructor {
    register(data: any): void
  }
  interface Vue {
    $confirm: () => Promise<any>
  }
}
/**
 * 类型参数
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'// 尺寸
export type Type = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'default'//  主题类型
/**
 * 组件
 */
export declare class MegComponent extends Vue {
  static install (vue: typeof Vue): void
}

declare const Megmore: Megmore
export default Megmore
export interface Megmore {
  install: PluginFunction<MegmoreUseOptions>
  version?: string
}

export interface MegmoreUseOptions {
  components?: Record<string, PluginObject<any> | PluginFunction<never>>
  theme?: Partial<MegmoreTheme> | false
  icons?: Partial<MegmoreIcons> | false
  // options?: Partial<MegmoreOptions>
}

export type Render = (h: () => VNode, context: RenderContext) => VNode

export namespace Model {//  各种数据模型

  export interface ModalComponent extends Vue {// 模态框组件
    escPress: () => void
  }
  export interface ConfirmOptions {
    title?: string,
    content?: string | Render,
    type?: Model.Type
  }
}

declare global {
  interface Window {
    Vue: VueConstructor
  }
}
