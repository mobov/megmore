import MApp from './components/app'
import MAvatar from './components/avatar'
import { VueConstructor } from 'vue'
const components = [
    MAvatar,
]

const install = (Vue: VueConstructor, opts = {}) => {
    //必装组件
    Vue.component(MApp.name, MApp)
    Vue.use(MApp)
    components.forEach( (component) => {
        const name = component.name
        Vue.component(name, component)
    })
}
/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue)
// }

export default {
    install,
    MAvatar,
}
export {
    MAvatar,
}

