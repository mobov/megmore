/**
 * Created by nocoolyoyo on 2018/11/19.
 */

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
