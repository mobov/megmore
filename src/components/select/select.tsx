import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import MInput from '@/components/text-field'
import MPopover from '@/components/popover'
import Option from './opion'
@Component
export default class MSelect extends Vue {
  @Prop({
    type:Array,
    default:[]
  })
  private options!:any[]
  public render(h) {
    return (
        <div class='m__select'>
          <MPopover inherit-width={true} placement='top-end'>
            <MInput end-icon='arrow_drop_down' slot='ref'></MInput>
            <div class='m__select-list'>
             {this.$slots.default||(
               <Option></Option>
             )}
            </div>
          </MPopover>
        </div>
    )
  }
}
