
import MTransitionExpansion from '@/components/transition/expansion'


/* istanbul ignore next */
MTransitionExpansion.install = function install(Vue: any): void {
    Vue.component(MTransitionExpansion.name, MTransitionExpansion)
}

export {
    MTransitionExpansion,
}
