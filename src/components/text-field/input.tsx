import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator'
import MIcon from '@/components/icon'
import {FormatInputPathObject} from 'path';

@Component
export default class MTextField extends Vue {
    @Prop({
        default: '',
        type: String
    })
    private value!: string
    @Prop({
        default: 'Label'
    })
    private label!: string
    @Prop({
        default: 'xl'
    })
    private size!: string
    @Prop({
        default: 'menu'
    })
    private icon!: string
    @Prop({
        default: 'menu'
    })
    private endIcon!: string
    @Prop({
        default: false,
        type: Boolean
    })
    private labelFloat!: boolean
    @Prop({
        default: 'asdasdasdasd'
    })
    private helpText!: string
    @Prop({
        default: ''
    })
    private errorText!: string
    @Prop({
        default: false,
        type: Boolean
    })
    private disabled!: boolean

    private isFocus: boolean = false


    private text: string = ''

    private get hasIcon() {
        return this.icon !== ''
    }

    private get hasHelpText() {
        return this.helpText !== ''
    }

    private get hasErrorText() {
        return this.errorText !== ''
    }

    private get hasEndIcon() {
        return this.endIcon !== ''
    }

    private handleFocus() {
        if (this.disabled) {
            return
        }
        if (!this.isFocus) {
            (this.$refs.input as HTMLFormElement).focus()
        }
        this.isFocus = true
    }


    private handleBlur() {
        if (!this.text)
            this.isFocus = false
    }
    @Watch('text',{
        immediate: true
    })
    private handleInput(val:string){
        this.$emit('input',val)
    }
    private render(h: any) {
        const labelCls = {
            'm--active': this.isFocus,
            [`m--${this.size}`]: true,
            'm--label-float': this.labelFloat,
        }
        const wrapCls = {
            'm--active': this.isFocus,
            'm--has-icon': this.hasIcon,
            'm--disabled': this.disabled,

        }
        const inputCls = {
            'm--has-end-icon': this.hasEndIcon
        }
        const contenCls = {
            'm--has-end-icon': this.hasEndIcon
        }
        const underlineCls = {
            'm--disabled': this.disabled,
        }
        const underlineContentCls = {
            'm--focus': this.isFocus,
            'm--bg-danger': this.hasErrorText,
            'm--bg-primary': !this.hasErrorText,
        }
        let iconCls:any={
            'm--color-danger': this.isFocus&&this.hasErrorText,
            'm--color-primary': this.isFocus&&!this.hasErrorText,
        }
        iconCls=Object.keys(iconCls).map((key:string)=>{
            if(iconCls[key]===true){
                return key
            }else{
                return ''
            }
        })
        iconCls=iconCls.join(' ')
        console.log(iconCls)
        return (
            <div staticClass='m-text-field' class={wrapCls}>
                {this.hasIcon && (<MIcon name={this.icon} />)}
                <div staticClass='m-text-field__label' class={labelCls} onClick={this.handleFocus}>
                    {this.label}
                </div>
                <div staticClass='m-text-field__content' class={contenCls}>
                    <input
                        disabled={this.disabled}
                        ref="input"
                        v-model={this.text}
                        type="text"
                        staticClass='m-text-field__input'
                        class={inputCls}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}/>
                    {this.hasEndIcon && (<MIcon class={iconCls} name={this.endIcon} />)}
                </div>
                <div staticClass='m-text-field__underline' class={underlineCls}>
                    <div
                        staticClass='m-text-field__underline-content m--bg-m-text-field__underline-content'
                        class={underlineContentCls} />
                </div>

                {!this.hasErrorText && this.hasHelpText && (
                    <div class='m-text-field__help-text'>
                        {this.helpText}
                    </div>
                )}
                {this.hasErrorText && (
                    <div class='m-text-field__error-text m--color-danger'>
                        {this.helpText}
                    </div>
                )}

            </div>
        )
    }
}
