import { VueConstructor } from 'vue';

import $confirm from './confirm'

export default function install(Vue: VueConstructor) {
 Vue.mixin({
  methods: {
   $confirm,
  },
 })
}
