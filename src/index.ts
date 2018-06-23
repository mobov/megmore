import './styles/style.scss'
import * as components from './components'
import { VueConstructor } from 'vue'
import { Megmore as MegmorePlugin, MegmoreUseOptions } from 'types'

const Megmore: MegmorePlugin = {
    install (Vue: VueConstructor, args?: MegmoreUseOptions): void {
        const MegmoreComponent: MegmorePlugin = components.Megmore

        Vue.use(MegmoreComponent, {
            components,
            ...args
        })
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Megmore)
}

export default Megmore
