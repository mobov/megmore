import MTable from './table'
import MTableColumn from './table-column'

/* istanbul ignore next */
MTable.install = function install(Vue: any) {
    Vue.component(MTable.name, MTable)
}
MTableColumn.install = function install(Vue: any) {
    Vue.component(MTableColumn.name, MTableColumn)
}

export {
    MTable,
    MTableColumn
}
