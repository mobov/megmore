/**
 * 依赖包类型定义
 */

declare module 'color' {
 export default function(colorValue: string): {
    isDark(): boolean,
    lighten(percent: number): any,
    darken(percent: number): any,
  }
}

declare module 'is-color-stop' {
  export function isColor(str: string): boolean
}
