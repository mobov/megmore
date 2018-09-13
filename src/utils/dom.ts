/**
 *
 * @param el 事件绑定
 * @param e
 * @param cb
 * @param propgation
 */
export function on(el: Element | Document | Window, e: string, cb: () => any = () => { }, propgation: boolean = false) {
    el.addEventListener(e, cb, propgation)
}
export function off(el: Element | Document | Window, e: string, cb: () => any = () => { }) {
    el.removeEventListener(e, cb)
}
export function addOnceEventListener(el: EventTarget, event: string, cb: () => void): void {
    const once = () => {
        cb()
        el.removeEventListener(event, once, false)
    }

    el.addEventListener(event, once, false)
}



/**
 * 目标dom向上查找到最近一层的滚动父级元素
 * @param el
 */
export function getScrollEventTarget(el: Element): Element | Window {
    let currentNode = el
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.nodeType === 1) {
        const overflowY = window.getComputedStyle(currentNode).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
            return currentNode
        }
        currentNode = (currentNode.parentNode as Element)
    }
    return window
}
/**
 * 获取滚动容器的滚动条尺寸
 * @param {Element} el
 */
export function getScrollbarSize(el: HTMLElement): number {
    return el.offsetWidth - el.clientWidth
}
