// ComponentOptions 声明于 types/options.d.ts 之中
import Vue from 'vue'

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        // default
        staticClass?: any
        class?: any
        style?: any
        // lifecycle
        updated?: (() => void) | undefined
        created?: (() => void) | undefined
        mounted?: (() => void) | undefined
        // events
        onClick?: (() => void) | undefined
        nativeOnClick?: (() => void) | undefined
        // base
        elevation?: number
        size?: string
        value?: any
        // table
        height?: string | number
        border?: boolean
        checkType?: 'multi' | 'single'
        checkField?: string
        // checkbox & radio
        label?: boolean | string | number
        // onInput?: (() => any)

    }
}
