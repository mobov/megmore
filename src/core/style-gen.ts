import Color from 'color'
import { BREAKPOINTS, ELEVATION_MAX, ELEVATION_MIN, SHAPES } from './constant'
import { isPalette, isCSSVar, getCSSVal } from './util'
import { HoverColor } from '@/core/cache'

/**
 * 获取有效css color属性值
 * @param {string} val
 * @return {string}
 */
function getStyleColorAttrVal(val: string): string {
    return isPalette(val)
        ? `var(--m-color-${val})`
        : isCSSVar(val)
            ? `var(${val})`
            : val
}

/**
 * 计算颜色样式值
 * @param styles
 * @param {string} compName
 * @param {string} property
 * @param {string} val
 */
export function genColor(styles: any, compName: string, property: string, val: string): void {
    if (val !== undefined) {
        styles[`--${compName}-${property}`] = getStyleColorAttrVal(val)
    }
}

/**
 * 计算hover颜色样式值
 * @param styles
 * @param {string} compName
 * @param {string} property
 * @param {string} val
 */
export function genHover(styles: any, compName: string, property: string, val: string): void {
    if (val !== undefined) {
        let result = val
        if (HoverColor.exist(val)) {
            result = HoverColor.getItem(val)
        } else {
            const realVal = getCSSVal(val)
            const colorObj = Color(realVal)

            result = colorObj.isDark() ? colorObj.lighten(.3) : colorObj.darken(.1)
            HoverColor.setItem(val, result)
        }

        styles[`--${compName}-${property}`] = result
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

/***
 * 静态样式表
 * @param styles
 * @param {string} compName
 * @param {string} property
 * @param {number | string} val
 */
export function genStaticStyles(styles: any, compName: string, property: string, val: number | string): void {
    if (val !== undefined) {
        styles[`--${compName}-${property}`] = val
    }
}
