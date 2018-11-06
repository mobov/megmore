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

//clickoutside手动绑定
export const outSideHandleKey = 'm-clickoutside-context'
interface Node extends Element {
    [outSideHandleKey]: {
        id: number,
        documentHandler: (e: MouseEvent, startClick: MouseEvent) => void,
        methodName: string,
        bindingFn: () => void,
    }
}

export const outSideNodeList: Node[] = []
export function onClickOutSide(dom: Node, cb: () => any) {
    dom[outSideHandleKey] = cb
    dom.documentHandler = (mouseup: MouseEvent, mousedown: MouseEvent) => {
        const target1 = mouseup.target as Node
        const target2 = mousedown.target as Node
        if (dom.contains(target1) || dom.contains(target2) || outSideNodeList.includes(target1) || outSideNodeList.includes(target1)) {
            return
        }
        el[ctx].bindingFn && el[ctx].bindingFn();
    }
    outSideNodeList.push(dom)
}
export function offClickOutSide(dom: Node, cb: () => any) {
    const index = outSideNodeList.findIndex(item => item === dom)
    outSideNodeList.splice(index, 1)
    delete dom.documentHandler
    delete dom[outSideHandleKey]
}