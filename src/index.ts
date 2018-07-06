import './styles/style.scss'
import * as components from './components'
import directives from './directives'
import Vue, { VueConstructor } from 'vue'
import { Megmore as MegmorePlugin, MegmoreUseOptions } from './types'
import methods from '@/methods'

const Megmore: MegmorePlugin = {
    install(Vue: VueConstructor, args?: MegmoreUseOptions): void {
        const MegmoreComponent: MegmorePlugin = components.Megmore

        Vue.use(MegmoreComponent, {
            components,
            /*    directives,*/
            ...args,
        })

        Vue.use(directives)

        Vue.use(methods)
    },
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Megmore)
}

export default Megmore
