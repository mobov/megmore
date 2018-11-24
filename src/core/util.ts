/**
 * Created by nocoolyoyo on 2018/11/19.
 */

import Buffer from './buffer'

/**
 * 验证是否是色板值
 * validate palette prop
 * @param {string | number} val
 * @return {boolean}
 */
export function isPalette(val: string| number): boolean {
    return typeof val === 'number'
        ? false
        : (val.indexOf('-') > 0)
}

/**
 * 验证是否是有效css属性值
 * validate css variable
 * @param {string | number} val
 * @return {boolean}
 */
export function isCSSVar(val: string | number): boolean {
    return typeof val === 'number'
        ? false
        : (val.indexOf('--') === 0)
}


/**
 * 获取真实css属性值
 * get rendered css value
 * @param {string} val
 * @return {string}
 */
export function getCSSVal(val: string): string {
    return isPalette(val)
        ? Buffer.docStyles.getPropertyValue(`--m-color-${val}`).trim()
        : isCSSVar(val)
            ? Buffer.docStyles.getPropertyValue(val).trim()
            : val
}
