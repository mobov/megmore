import { FunctionalComponentOptions, VNode } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

const prefix = 'm-transition-expansion'
function getSize(size: string): number {
    if (!size) { return 0 }
    const index = size.indexOf('px')
    if (index === -1) { return 0 }
    return Number(size.substring(0, index))
}
@Component({ functional: true } as FunctionalComponentOptions)
export default class MTransitionExpansion extends Vue {
    private render(h: any, { props, data, children }: any): VNode {

        function beforeEnter(el: HTMLElement): void {
            console.log(el.style.height)
            el.dataset.originPaddingTop = el.style.paddingTop
            el.dataset.originPaddingBottom = el.style.paddingBottom
            el.dataset.originOverflow = el.style.overflow
            el.style.paddingTop = '0'
            el.style.paddingBottom = '0'
            el.style.height = '0'
        }
        function enter(el: HTMLElement): void {
            el.style.display = 'block'
            el.style.overflow = 'hidden'
            el.style.height = el.scrollHeight + getSize(el.dataset.originPaddingTop) + getSize(el.dataset.originPaddingBottom) + 'px'
            el.style.paddingTop = el.dataset.originPaddingTop
            el.style.paddingBottom = el.dataset.originPaddingBottom
        }
        function afterEnter(el: HTMLElement): void {
            // el.style.display = '';
            // el.style.height = '';
            el.style.overflow = el.dataset.originOverflow
            el.style.paddingTop = el.dataset.originPaddingTop
            el.style.paddingBottom = el.dataset.originPaddingBottom
        }
        function beforeLeave(el: HTMLElement): void {
            el.dataset.originPaddingTop = el.style.paddingTop
            el.dataset.originPaddingBottom = el.style.paddingBottom
            el.dataset.originOverflow = el.style.overflow

            el.style.display = 'block'
            if (el.scrollHeight !== 0) {
                el.style.height = el.scrollHeight + 'px'
            }
            el.style.overflow = 'hidden'
        }
        function leave(el: HTMLElement): void {
            if (el.scrollHeight !== 0) {
                setTimeout(() => {
                    el.style.height = 0
                    el.style.paddingTop = 0
                    el.style.paddingBottom = 0
                })
            }
        }
        function afterLeave(el: HTMLElement): void {
            el.style.display = 'none'
            el.style.height = ''
            el.style.overflow = el.dataset.originOverflow
            el.style.paddingTop = el.dataset.originPaddingTop
            el.style.paddingBottom = el.dataset.originPaddingBottom
        }

        return <transition name={prefix}
                           onBeforeEnter={beforeEnter}
                           onEnter={enter}
                           onAfterEnter={afterEnter}
                           onBeforLeave={beforeLeave}
                           onLeave={leave}>
                   {children}
               </transition>
    }
}
