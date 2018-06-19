import MAvatar from './avatar.vue'
import Vue from 'vue'
import { VueConstructor } from 'vue'

/* istanbul ignore next */
(MAvatar as Model.Component).install = function install (Vue:VueConstructor) {
    Vue.component(MAvatar.name, MAvatar)
}

export default MAvatar
