import { VueConstructor } from 'vue';

import $confirm from '@/methods/confirm'

export default function install(Vue: VueConstructor) {
 Vue.mixin({
  methods: {
   $confirm,
  },
 })
}
