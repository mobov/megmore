import { Component, Prop, Watch, Vue, Emit, Model, Provide } from 'vue-property-decorator'
import { Color, DateValueFormat, DateValueType, DatePickerType } from "@/types/model"

@Component
export default class TimePickerBase extends Vue {

    @Prop({ type: Boolean, default: false })
    public desync!: boolean

    @Prop({ type: [Date, Number, String], default: new Date().getTime() })
    public value!: any

    @Prop({ type: String, default: 'timestamp' })
    public valueFormat!: DateValueFormat

    @Prop({ type: Boolean, default: false })
    public ampm!: boolean

    @Prop({ type: Number, default: 1 })
    public hourStep!: number

    @Prop({ type: Number, default: 1 })
    public minuteStep!: number

    @Prop({ type: [Date, Number, String], default: 2100 })
    public max!: any

    @Prop({ type: [Date, Number, String], default: 1900 })
    public min!: any

    @Prop({ type: Number, default: 0 })
    public firstDayOfWeek!: number

    @Prop({ type: String, default: 'date' })
    public pickerType!: DatePickerType

    @Prop({ type: Boolean, default: false })
    public confirmation!: boolean

    // 输入适配
    public valueAdaptI(val: any): number {
        let result = 0
        if (this.valueFormat === 'timestamp') {
            result = typeof val === 'string' ? Number(val) : val
        } else
        if (this.valueFormat === 'Date') {
            result = val.getTime()
        }
        return result
    }
    // 输出适配
    public valueAdaptO(val: number): any {
        let result = null
        if (this.valueFormat === 'timestamp') {
            result = val
        } else
        if (this.valueFormat === 'Date') {
            result = new Date(val)
        }
        return result
    }

    @Emit('confirm')
    public handleConfirm() {
        this.DateStore.emitInput()
    }

    @Emit('cancel')
    public handleCancel() { return }

    @Emit('input')
    public onInput(val: any) { return }

    @Watch('value', { immediate: true })
    public onValueUpdate(val: any, oldVal: any) {
        if (val === oldVal) { return }
        this.DateStore.UPDATE(this.valueAdaptI(val))
    }

    @Watch('ampm', { immediate: true })
    public onAMPMUpdate(val: any, oldVal: any) {
        if (val === oldVal) { return }
        this.DateStore.SET_AMPM(val)
    }

    @Watch('pickerType', { immediate: true })
    public onPickerTypeChange(val: any, oldVal: any) {
        this.DateStore.SET_PICKER_TYPE(val)
        switch (val) {
            case 'datetime' : this.DateStore.SET_ACTIVE_TYPE('date'); break;
            default : this.DateStore.SET_ACTIVE_TYPE(val)
        }
    }

    @Provide()
    public DateStore: any = {
        value: this.valueAdaptI(this.value),
        pickerType: this.pickerType,
        activeType: 'date',
        ampm: false,
        get dateValue(): Date {
            return new Date(this.value)
        },
        get year(): number {
            return this.dateValue.getFullYear()
        },
        get month(): number {
            return this.dateValue.getMonth()
        },
        get weekDay(): number {
            return this.dateValue.getDay()
        },
        get date(): number {
            return this.dateValue.getDate()
        },
        get hours(): number {
            let result = this.dateValue.getHours()
            if (this.ampm && result >= 12) { result = result - 12 }
            return result
        },
        get minutes(): number {
            return this.dateValue.getMinutes()
        },
        get am(): boolean {
            return this.dateValue.getHours() < 12
        },
        SET_ACTIVE_TYPE(type: DateValueType): void {
            if (type === this.activeType) { return }
            this.activeType = type
        },
        SET_PICKER_TYPE(type: DatePickerType): void {
            if (type === this.pickerType) { return }
            this.pickerType = type
        },
        SET_AM(val: boolean): void {
            if (val === this.am) { return }
            const temp = new Date(this.value)
            temp.setHours(val ? this.hours : this.hours + 12)
            this.value = temp.getTime()
        },
        SET_AMPM(val: boolean): void {
            if (val === this.ampm) { return }
            this.ampm = val
        },
        UPDATE: (val: number, type: DateValueType = 'date'): void => {
            const self = this.DateStore
            const result = new Date(self.value)
            if (type === 'year') {
                result.setFullYear(val)
                self.value = result.getTime()
            } else if (type === 'month') {
                result.setMonth(val)
                self.value = result.getTime()
            } else if (type === 'hours') {
                result.setHours(val)
                self.value = result.getTime()
            } else if (type === 'minutes') {
                result.setMinutes(val)
                self.value = result.getTime()
            } else {
                self.value = val
            }
            if (this.desync) { return }
            if (this.confirmation) { return }
            if (this.valueAdaptI(this.value) === self.value) { return }
            self.emitInput()
        },
        emitInput: (): void => {
            const self = this.DateStore
            const outValue = this.valueAdaptO(self.value)
            this.onInput(outValue)
        },
    }
}
