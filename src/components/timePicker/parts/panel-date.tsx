import { Component, Prop, Emit, Vue } from 'vue-property-decorator'
import MButton from '@/components/button'
import MIcon from '@/components/icon'
import { VNode } from 'vue'
import { Model } from '@/types'

const name = 'MTimePickerPanelDate'
const prefix = 'm-time-picker-panel-date'

@Component({
    name,
    components: { MButton, MIcon },
})
export default class MTimePickerPanelDate extends Vue {
    @Prop({ type: String, default: 'primary' })
    private type!: Model.Color

    get classes(): any {
        return {
            // [`color-${this.type}`]: this.type,
        }
    }

    public render(): VNode {
        const { classes, type } = this
        return (
            <div staticClass={`${prefix}`} class={classes}>
                <div class={`${prefix}--header`}>
                    <div staticClass={`${prefix}--header-year`}>
                        <MButton variety="flat" type="legacy">2018</MButton>
                    </div>
                    <div staticClass={`${prefix}--header-handler`}>
                        <MButton variety="flat" shape="circle" type="legacy"><MIcon name="navigate_before" /></MButton>
                        <MButton variety="flat" shape="circle" type="legacy"><MIcon name="navigate_next" /></MButton>
                    </div>
                 </div>
                <table class={`${prefix}-table`}>
                    <thead>
                        <tr>
                            <td>日</td>
                            <td>一</td>
                            <td>二</td>
                            <td>三</td>
                            <td>四</td>
                            <td>五</td>
                            <td>六</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
