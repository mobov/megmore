import { VueConstructor } from 'vue';

import $confirm from './confirm'
import { openOverlay as $openOverlay, closeOverlay as $closeOverlay } from './overlay'
export default function install(Vue: VueConstructor) {
  Vue.mixin({
    methods: {
      $confirm,
      $openOverlay,
      $closeOverlay,
    },
  })
}
