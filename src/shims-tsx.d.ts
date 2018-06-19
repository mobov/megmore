import Vue, { VNode, VueConstructor } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
declare module '*.tsx'{
  interface Comonent extends Vue {
    name: string,
    install(Vue: VueConstructor): void
  }
  export default Comonent
}