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

/**
 * 获取计算颜色样式值
 * get styles color value
 * @param val
 * @return {string}
 */
export function genColor(val: string): string | boolean  {
    if (val === undefined) { return false }
    return isPalette(val)
        ? `var(--m-color-${val})`
        : isCSSVar(val)
            ? `var(${val})`
            : val
}

/**
 * 获取计算尺寸样式值
 * @param {number | string} val
 * @return {string}
 */
export function genSize(val: number | string): string | boolean {
    if (val === undefined) { return false }

    return typeof val === 'number'
        ? `${val}px`
        : val
}
