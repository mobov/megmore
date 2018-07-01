let zIndex = 99999
export const getZIndex = () => zIndex++



/**
 * 获取鼠标点击位置
 * @param target
 * @return {{top: number; left: number}}
 */
export function getTouchRect(
    target: any,
): {
    left: number,
    top: number,
} {
    let position = { top: 0, left: 0}
    const ele = document.documentElement

    if (typeof target.getBoundingClientRect !== 'undefined') {
        position = target.getBoundingClientRect()
    }

    return {
        top: position.top + window.pageYOffset - ele.clientTop,
        left: position.left + window.pageXOffset - ele.clientLeft,
    }
}
