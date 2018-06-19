declare namespace Model {
 export interface renderParam {
  data: any,
  props: any,
  children: any
 }

 export interface Component{
  install(Vue: any): void
 }
}