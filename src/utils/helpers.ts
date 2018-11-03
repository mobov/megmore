import { VNode, VNodeDirective, FunctionalComponentOptions } from 'vue'
import { isColor } from 'is-color-stop'
import { isStyleUnit } from '@megmore/es-helper'

export { isColor }
// KeyboardEvent.keyCode aliases
export const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
})

/**
 * @description 判断color是预设值关键字还是色值
 */
export const colorDetermine = (color: string, styleField: 'bg' | 'color') => {
  type clsMap = {
    [key: string]: boolean | string,
  }
  const cls: clsMap = {}
  const style: clsMap = {}
  const styleKeyMap = {
    bg: 'backgroundColor',
    color: 'color',
  }
  if (!isColor(color)) {
    cls[`m--${styleField}-${color}`] = true
  } else {
    const styleKey = styleKeyMap[styleField]
    style[styleKey] = color
  }
  return {
    class: cls,
    style,
  }
}
/**
 * @description 根据业务值返回真实渲染样式尺寸
 */
export function toAbsStyleSize(value: string | number): string {
  if (typeof value !== 'number' && isStyleUnit(value)) {
    return value
  } else {
    return `${value}px`
  }
}
