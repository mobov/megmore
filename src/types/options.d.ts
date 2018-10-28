// ComponentOptions 声明于 types/options.d.ts 之中
import Vue from 'vue'
import {Shape, Variety} from '@/types/model'

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        // default
        staticClass?: any
        class?: any
        style?: any
        ref?: string
        // lifecycle
        updated?: (() => void) | undefined
        created?: (() => void) | undefined
        mounted?: (() => void) | undefined
        // events
        onClick?: (() => void) | undefined
        onInput?: (() => void) | undefined
        nativeOnClick?: (() => void) | undefined
        // base
        elevation?: number
        size?: string
        color?: string
        value?: any
        // table
        height?: string | number
        border?: boolean
        checkType?: 'multi' | 'single'
        checkField?: string
        noHeader?: boolean
        rowCheck?: boolean
        onRowClick?: (() => void) | undefined
        onCheck?: (() => void) | undefined
        updateSize?: (() => void) | undefined
        // timePicker
        max?: any
        min?: any
        firstDayOfWeek?: any
        onPick?: (() => void) | undefined
        onConfirm?: (() => void) | undefined
        onCancel?: (() => void) | undefined
        // checkbox & radio
        label?: boolean | string | number
        // button
        shape?: Shape
        variety?: Variety
    }
}
