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
/**
 * 目标dom向上查找到最近一层的滚动父级元素
 * @param el
 */
export function getScrollEventTarget(el: Element) {
 let currentNode = el;
 while (currentNode && currentNode.tagName !== 'HTML' && currentNode.nodeType === 1) {
  const overflowY = window.getComputedStyle(currentNode).overflowY;
  if (overflowY === 'scroll' || overflowY === 'auto') {
   return currentNode;
  }
  currentNode = (currentNode.parentNode as Element);
 }
 return window;
}
