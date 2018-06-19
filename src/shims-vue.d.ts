declare module '*.vue' {
  import Vue, { VueConstructor } from 'vue'
  interface Component extends Vue{
    name:string,
    z:string,
    install(Vue: VueConstructor): void
  }
  const component: Component
  export default component
}



declare module 'vue/types/vue' {
  import Vue, { VueConstructor } from 'vue'
  interface Vue{
    install(Vue: VueConstructor): void
  }
}