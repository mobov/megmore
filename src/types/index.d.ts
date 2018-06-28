import Vue, { PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions } from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor {
    install(Vue: VueConstructor): void // 为组件构造函数添加一个install方法以单独引用
    register(data: any): void
  }
}

declare const Megmore: Megmore
export default Megmore
export interface Megmore {
    install: PluginFunction<MegmoreUseOptions>
    version?: string
}

export interface Component extends Vue{
  install:(Vue:VueConstructor)=>void
}

export interface MegmoreUseOptions {
    components?: Record<string, PluginObject<any> | PluginFunction<never>>
    theme?: Partial<MegmoreTheme> | false
    icons?: Partial<MegmoreIcons>
    options?: Partial<MegmoreOptions>
}

export interface ModalComponent extends Vue{
  escPress:()=>void
}

declare global {
  namespace Model{
    export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'hg'
    export type Type = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'default'
  }
  interface Window{
    Vue:VueConstructor
  }
}
