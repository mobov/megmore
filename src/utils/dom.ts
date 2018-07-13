export function on(el: Element | Document, e: string, cb: () => void = () => { }, propgation: boolean = false) {
 el.addEventListener(e, cb, propgation)
}