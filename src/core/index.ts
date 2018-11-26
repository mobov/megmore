import './common/color.scss'
import './common/elevation.scss'
import './common/space.scss'
import './common/shape.scss'
import './common/theme.scss'
import { VueConstructor } from 'vue'
import { Megmore as MegmorePlugin, MegmoreUseOptions } from '@/types'
import { getTheme, registerTheme, useTheme } from '@/components/megmore/theme'
import MIcon from '@/icon'

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
        // useTheme('unicon')
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
}

/* istanbul ignore next */
export default Megmore
