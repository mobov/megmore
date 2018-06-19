import H from './HelloWorld.vue';
import { VueConstructor } from 'vue';
H.install = function install(Vue: VueConstructor) {
  Vue.component(H.name, H);
};
export default H;
