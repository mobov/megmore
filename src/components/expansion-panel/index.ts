import MExpansionPanel from './expansion-panel'
import MExpansionPanelContent from './expansion-panel-content'
/* istanbul ignore next */
MExpansionPanel.install = function install(Vue) {
  Vue.component(MExpansionPanel.name, MExpansionPanel)
}

MExpansionPanelContent.install = function install(Vue) {
  Vue.component(MExpansionPanelContent.name, MExpansionPanelContent)
}
export {
  MExpansionPanel,
  MExpansionPanelContent,
}
