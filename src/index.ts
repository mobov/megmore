import MAvatar from './components/avatar';
import { VueConstructor } from 'vue';
const components = [
    MAvatar,
];

const install = (Vue: VueConstructor, opts = {}) => {
    components.forEach( (component) => {
        const name = component.name;
        Vue.component(name, component);
    });
};
/* istanbul ignore if */
// if (typeof window !== 'undefined' && window.Vue) {
//     install(window.Vue)
// }


export default {
    install,
    MAvatar,
};
export {
    MAvatar,
};

