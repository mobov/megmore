import './styles/style.scss'
import * as components from './components'
import Vue, { VueConstructor } from 'vue'
import { Megmore as MegmorePlugin, MegmoreUseOptions } from './types'
import eventStop from './directives/stopPropagation'
import * as methods from '@/methods'
console.log(methods)
Vue.directive(eventStop.name, eventStop)

const Megmore: MegmorePlugin = {
    install(Vue: VueConstructor, args?: MegmoreUseOptions): void {
        const MegmoreComponent: MegmorePlugin = components.Megmore

        Vue.use(MegmoreComponent, {
            components,
            ...args
        })

        Vue.mixin({
            methods: {
                ...methods
            }
        })

    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Megmore)
}

export default Megmore
