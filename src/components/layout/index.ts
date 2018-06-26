import MContainer from './container'

const Layout = {}

/* istanbul ignore next */
Layout.install = function install (Vue) {
  Vue.component(MContainer.name, MContainer)
}

export {
    MContainer,
}

export default Layout
