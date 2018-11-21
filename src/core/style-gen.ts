import { BREAKPOINTS, ELEVATION_MAX, ELEVATION_MIN, SHAPES } from "./constant"
import { isPalette, isCSSVar } from "./util"

/**
 * 计算颜色样式值
 * @param styles
 * @param {string} compName
 * @param {string} property
 * @param {string} val
 */
export function genColor(styles: any, compName: string, property: string, val: string): void {
    if (val !== undefined) {
        styles[`--${compName}-${property}`] = isPalette(val)
            ? `var(--m-color-${val})`
            : isCSSVar(val)
                ? `var(${val})`
                : val
    }
}

/**
 * 计算尺寸样式值
 * @param styles
 * @param {string} compName
 * @param {string} property
 * @param {number | string} val
 */
export function genSize(styles: any, compName: string, property: string, val: number | string): void {
    if (val !== undefined) {
        styles[`--${compName}-${property}`] = typeof val === 'number'
            ? `${val}px`
            : BREAKPOINTS.includes(val)
                ? `var(--${compName}-${property}-${val})`
                : val
    }
}

/**
 * 计算阴影
 * @param styles
 * @param {string} compName
 * @param {number | string} val
 */
export function genElevation(styles: any, compName: string, val: number): void {
    if (val !== undefined && val >= ELEVATION_MIN && val <= ELEVATION_MAX ) {
        styles[`--${compName}-elevation`] = `var(--m-elevation-${val})`
    }
}

/**
 * 计算圆角
 * @param styles
 * @param {string} compName
 * @param {string} val
 */
export function genShape(styles: any, compName: string, val: string): void {
    if (val !== undefined && SHAPES.includes(val)) {
        styles[`--${compName}-shape`] = `var(--m-shape-${val})`
    }
}
