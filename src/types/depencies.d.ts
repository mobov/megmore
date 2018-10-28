/**
 * 依赖包类型定义
 */
declare module 'es-treasure' {
  export function isHexColor(val: string): boolean
  export function isStyleUnit(val: string): boolean
  export function strStyles(val: any): string
  export function getStyle(dom: HTMLElement, attr: string): string
}

declare module 'color' {
 export default function(colorValue: string): {
    isDark(): boolean,
    lighten(percent: number): boolean,
    darken(percent: number): boolean,
  }
}

declare module 'is-color-stop' {
  export function isColor(str: string): boolean
}
