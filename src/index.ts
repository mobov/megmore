import MAvatar from './components/avatar'
import { VueConstructor} from 'vue'
const components = [
    MAvatar
]

const install = function (Vue: VueConstructor, opts = {}) {
    components.forEach(component => {
	    const name = component.name
	    Vue.component(name, component)
	    console.log(component.name)
    })
}
/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue)
// }


export default{
    install,
    MAvatar
}
export {
    MAvatar
}
