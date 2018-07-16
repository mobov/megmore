export function on(el: Element | Document, e: string, cb: () => any = () => { }, propgation: boolean = false) {
 el.addEventListener(e, cb, propgation)
}
export function off(el: Element | Document, e: string, cb: () => any = () => { }) {
 el.removeEventListener(e, cb)
}