import {Component, Prop, Watch, Vue, Model, Provide} from 'vue-property-decorator'
import { Color, DateValueFormat } from "@/types/model"
/**
 * 可切换显示隐藏组件mixin
 */
@Component
export default class TimePickerBase extends Vue {
    @Prop({ type: String, default: 'primary' })
    public type!: Color

    @Prop({ type: Number, default: 2 })
    public elevation!: number

    @Model('change', { type: [Date, Number, String], default: new Date().getTime() })
    public value!: any

    @Prop({ type: String, default: 'timestamp' })
    public valueFormat!: DateValueFormat

    @Provide()
    public DateStore: any = {
        value: this.value.getTime(),
        get dateValue(): Date{
            return new Date(this.value)
        },
        update(val: number){
            this.value = val
        }
    }

    get baseClasses(): any {
        return{
            [`m--elevation-${this.elevation}`]: this.elevation,
        }
    }
}
