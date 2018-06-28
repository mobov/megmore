/**
 * 阻止事件冒泡
 */
export default {
 name: 'event-stop',
 bind(el: HTMLElement) {
  const clickHandler = (event: MouseEvent) => {
   event.preventDefault()
   event.stopImmediatePropagation()
  }
  el.addEventListener('click', clickHandler, true)
 }
}