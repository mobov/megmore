import { PluginFunction, PluginObject, VueConstructor, DirectiveFunction, DirectiveOptions, ComponentOptions, RenderContext, VNode } from 'vue'

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    register(data: any): void,
    install (vue: typeof Vue): void
    render(h: any, context: any):VNode
  }
  interface Vue {
    options:any,
    $confirm: () => Promise<any>
  }
}
declare global {
  interface Window {
    Vue: VueConstructor
  }
}
