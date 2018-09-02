import { Component, Prop, Emit, Vue, Inject } from 'vue-property-decorator'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import {type} from "os";

@Component
export default class TableBody extends Vue {
    @Inject() TableData!: any
    @Inject() TableCols!: any

    private RCols(data: any): VNode{
        const { TableCols } = this
        const result: any = []

        TableCols.forEach((item: any) =>{
           console.log(typeof item)
            result.push(<td>{ typeof item === 'string' ? data[item] : item }</td>)
        })

        return result
    }

    private RRows(): VNode {
        const { TableData, RCols } = this
        const result: any = []

        TableData.forEach((item: any) =>{
            result.push(<tr>{RCols(item)}</tr>)
        })

        return result
    }

    public render(): VNode {
        const { data, $scopedSlots, RRows, TableData } = this
        console.log(TableData)
        return (
            <table>
                <tbody>
                    {RRows()}
                </tbody>
            </table>
        )
    }
}
