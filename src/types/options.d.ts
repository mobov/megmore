// ComponentOptions 声明于 types/options.d.ts 之中
import Vue from 'vue'

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        // lifecycle
        updated?: (() => void) | undefined
        created?: (() => void) | undefined
        mounted?: (() => void) | undefined
        // base
        elevation?: number
        size?: string
        // table
        height?: string | number
    }
}
