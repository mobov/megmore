import Vue, {RenderContext, VNode, VueConstructor} from "vue"


export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'// 尺寸
export type Type = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'default'//  颜色主题类型

export type Color = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'default' | string //  颜色主题类型
export type Variety = 'normal' | 'flat' | 'outline' |  'pure' //  类型变异
export type Shape = 'square' | 'corner' | 'round' | 'circle' //  形状

// date
export type DateValueFormat = 'timestamp' | 'Date'
export type DatePickerType = 'datetime' | 'date' | 'year' | 'month' | 'time' | 'hours' | 'minutes'
export type DateValueType = 'year' | 'month' | 'week' | 'date' | 'time' | 'hours' | 'minutes'
export type DateTimeValueType = 'time' | 'hours' | 'minutes'


export interface ModalComponent extends Vue {// 模态框组件
    escPress: () => void,
    show: boolean,
    _value: boolean,
    visible: boolean
}
export interface Component extends Vue {//  普通组件
    install: (Vue: VueConstructor) => void
}
export interface Render {
    (h: () => VNode, context: RenderContext): VNode
}
export interface ConfirmOptions {
    title?: string,
    content?: string | Render,
    type?: Color
}