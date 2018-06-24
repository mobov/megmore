import { VueConstructor } from 'vue/types'
import { Megmore as MegmorePlugin } from 'types'
import MIcon from '../icon'
import { getTheme, registerTheme, renderTheme } from './theme'
const Megmore: MegmorePlugin = {
    install (Vue: VueConstructor, opts: any = {}) {
        if ((this as any).installed) return
        (this as any).installed = true

        Vue.prototype.$megmore = new Vue({
            data: {
                // options: options(opts.options),
                // rtl: opts.rtl,
                theme: 'unicon'
            },
            methods: {
                useTheme(name = 'unicon'){
                    this.theme = name
                },
                getTheme,
                registerTheme
            }
        })
        renderTheme('unicon')
        if (opts.components) {
            Object.values(opts.components).forEach(component => {
                Vue.use(component)
            })
        }
        if (opts.icons) {
            Object.values(opts.icons).forEach(icon => {
                MIcon.register(icon)
            })
        }
    },
    version: '1.0.0'
}

/* istanbul ignore next */
export default Megmore
