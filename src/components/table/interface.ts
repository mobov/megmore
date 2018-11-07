// ComponentOptions 声明于 types/options.d.ts 之中
import Vue from 'vue'
import {Shape, Variety} from '@/types/model'

export interface ComponentOptions extends Vue  {
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
    }

