import './styles/style.scss'
import * as components from './components'
// import * as directives from './directives'
import Vue, { VueConstructor } from 'vue'
import { Megmore as MegmorePlugin, MegmoreUseOptions } from './types'
import * as methods from '@/methods'

const Megmore: MegmorePlugin = {
    install(Vue: VueConstructor, args?: MegmoreUseOptions): void {
        const MegmoreComponent: MegmorePlugin = components.Megmore

        Vue.use(MegmoreComponent, {
            components,
        /*    directives,*/
            ...args,
        })

        Vue.mixin({
            methods: {
                ...methods,
            },
        })
    },
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Megmore)
}

export default Megmore
