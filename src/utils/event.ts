/**
 *
 * @param el 事件绑定
 * @param e
 * @param cb
 * @param propgation
 */
export function on(
    el: Element | Document | Window, e: string,
    cb: () => any = (): void => void(0),
    propgation: boolean = false,
): void {
 el.addEventListener(e, cb, propgation)
}

export function off(
    el: Element | Document | Window, e: string,
    cb: () => any = (): void => void(0),
): void {
 el.removeEventListener(e, cb)
}

export function once(el: EventTarget, event: string, cb: () => void): void {
    const run = () => {
        cb()
        el.removeEventListener(event, run, false)
    }

    el.addEventListener(event, run, false)
}
