import Vue, { VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor {
    install(Vue: VueConstructor): void // 为组件构造函数添加一个install方法以单独引用
  }
}


