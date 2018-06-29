import { VueConstructor } from 'vue/types'
import { Megmore as MegmorePlugin, MegmoreUseOptions } from '@/types'
import { getTheme, registerTheme, useTheme } from './theme'
import MIcon from '@/components/icon'

const Megmore: MegmorePlugin = {
    install(Vue: VueConstructor, opts?: MegmoreUseOptions): void {
        if ((this as any).installed) { return }
        (this as any).installed = true

        Vue.prototype.$megmore = new Vue({
            methods: {
                useTheme,
                getTheme,
                registerTheme,
            },
        })
        // 使用主题
        useTheme('unicon')
        // 注册组件
        if (opts.components) {
            Object.values(opts.components).forEach((component: object) => {
                Vue.use(component)
            })
        }
        // 注册图标
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
