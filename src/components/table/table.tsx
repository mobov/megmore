import {Component, Prop, Emit, Vue, Provide} from 'vue-property-decorator'
import MIcon from '@/components/icon'
import MCheckbox from '@/components/checkbox'
import MRadio from '@/components/radio'
import { VNode } from 'vue'
import {Size, Color, DateValueType, DatePickerType} from '@/types/model'
import TableHead from './components/head'
import TableBody from './components/body'

const prefix = 'm-table'

@Component({ components: {
    TableHead, MCheckbox, MRadio
}})
export default class MTable extends Vue {

    @Prop({ type: Array, default: [] })
    public data!: any

    @Prop({ type: Number, default: 1 })
    private elevation!: number

    @Prop({ type: String, default: 'md' })
    private size!: string

    private genCol(item: any): any{
        const { attrs } = item.data
        let result = null
        //type特殊col内容渲染
        if(attrs.type){
            if(attrs.type === 'checkbox'){
                result = <MCheckbox />
            }else if(attrs.type === 'radio'){
                result = <MRadio />
            }
        }else if(attrs.field){
            result = attrs.field
        }else{

        }

        return result
    }

    @Provide()
    public TableData: any = this.data

    @Provide()
    public get TableCols(): any{
        const { $slots, genCol } = this
        const result: any = []
        // 声明渲染
        $slots.default.forEach((item: any)=>{
            result.push(genCol(item))
        })

        return result
    }



    private render(): VNode {
        const {  } = this

        console.log(this.$slots.default)
        console.log(this.$slots)
        console.log(this)
        const classes = {
            [`m--elevation-${this.elevation}`]: true,
            [`m--${this.size}`]: true,
        }

        return (
            <div staticClass={`${prefix}`} class={classes}>
                <TableHead />
                <TableBody />
            </div>
        )
    }
}

