import { VueConstructor } from 'vue/types'
import { Megmore as MegmorePlugin, MegmoreUseOptions } from '@/types'
import MIcon from '../icon'
import { getTheme, registerTheme, useTheme } from './theme'

const Megmore: MegmorePlugin = {
    install(Vue: VueConstructor, opts: MegmoreUseOptions): void {
        if ((this as any).installed) { return }
        (this as any).installed = true

        Vue.prototype.$megmore = new Vue({
            methods: {
                useTheme,
                getTheme,
                registerTheme,
            },
        })
        useTheme('unicon')

        if (opts.components) {
            Object.values(opts.components).forEach((component: object) => {
                Vue.use(component)
            })
        }
        if (opts.icons) {
            Object.values(opts.icons).forEach((icon: object) => {
                MIcon.register(icon)
            })
        }
    },
    version: '1.0.0',
}

/* istanbul ignore next */
export default Megmore
