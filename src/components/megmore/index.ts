import { VueConstructor } from 'vue'
import { Megmore as MegmorePlugin, MegmoreUseOptions } from '@/types'
import breakpoints from '@/components/megmore/breakpoints'
import palettes from '@/components/megmore/palettes'
import elevations from '@/components/megmore/elevations'
import { getTheme, registerTheme, useTheme } from '@/components/megmore/theme'
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
            Object.values(opts.components).forEach((component: any) => {
                Vue.use(component)
            })
        }
        // 注册图标
        if (opts.icons) {
            Object.values(opts.icons).forEach((icon: any ) => {
                MIcon.register(icon)
            })
        }
    },
    version: '1.0.0',
    size: 'md',
    elevations,
    palettes,
    breakpoints,
}

/* istanbul ignore next */
export default Megmore
