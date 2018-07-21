import {Component, Prop, Watch, Vue, Model, Provide} from 'vue-property-decorator'
import { Color, DateValueFormat, DateValueType } from "@/types/model"

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

    @Prop({ type: [Date, Number, String], default: 2100 })
    public max!: any

    @Prop({ type: [Date, Number, String], default: 1900 })
    public min!: any

    @Provide()
    public DateStore: any = {
        value: this.value.getTime(),
        get dateValue(): Date{
            return new Date(this.value)
        },
        get year(): number {
            return this.dateValue.getFullYear()
        },
        get month(): number {
            return this.dateValue.getMonth()
        },
        get date(): number {
            return this.dateValue.getDate()
        },
        get hours(): number {
            return this.dateValue.getHours()
        },
        get minutes(): number {
            return this.dateValue.getMinutes()
        },

        UPDATE(val: number, type: DateValueType = 'date'){

            const result = new Date(this.value)
            if(type === 'year') {
                result.setFullYear(val)
                this.value = result.getTime()
            } else if(type === 'month') {
                result.setMonth(val)
                this.value = result.getTime()
            }else {
                this.value = val
            }
        }
    }

    get baseClasses(): any {
        return{
            [`m--elevation-${this.elevation}`]: this.elevation,
        }
    }
}
