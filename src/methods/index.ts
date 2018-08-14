import { VueConstructor } from 'vue';

import $confirm from '@/methods/confirm'
import $toast from '@/methods/toast'
import { openOverlay as $openOverlay, closeOverlay as $closeOverlay } from '@/methods/overlay'
export default function install(Vue: VueConstructor) {
  Vue.mixin({
    methods: {
      $confirm,
      $openOverlay,
      $closeOverlay,
      $toast,
    },
  })
}
