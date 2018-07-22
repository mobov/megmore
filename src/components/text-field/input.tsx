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
        default: ''
    })
    private label!: string

    @Prop({
        default: ''
    })
    private icon!: string
    @Prop({
        default: ''
    })
    private endIcon!: string
    @Prop({
        default: false,
        type: Boolean
    })
    private labelFloat!: boolean
    @Prop({
        default: ''
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
    @Prop({
        default: '',
        type: String
    })
    private prefix!: string

    @Prop({
        default: '',
        type: String
    })
    private suffix!: string
    @Prop({
        default: false,
        type: Boolean
    })
    private multiLine!: boolean
    @Prop({
        default: 3,
        type: Number
    })
    private rows!: number

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

    private get hasPrefix() {
        return this.prefix !== ''
    }

    private get hasSuffix() {
        return this.suffix !== ''
    }

    private get hasText() {
        return this.text !== ''
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
        this.isFocus = false
    }

    @Watch('text', {
        immediate: true
    })
    private handleInput(val: string) {
        this.$emit('input', val)
    }

    private render(h: any) {
        const labelCls = {
            'm--active': this.isFocus || this.hasText,
            'm--label-float': this.labelFloat,
            'm--has-icon': this.hasIcon,
        }
        const wrapCls = {
            'm--active': this.isFocus,
            'm--disabled': this.disabled,

        }
        const inputWrapCls = {
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
        let iconCls: any = {
            'm--color-danger': this.isFocus && this.hasErrorText,
            'm--color-primary': this.isFocus && !this.hasErrorText,
        }
        iconCls = Object.keys(iconCls).map((key: string) => {
            if (iconCls[key] === true) {
                return key
            } else {
                return ''
            }
        })
        iconCls = iconCls.join(' ')
        console.log(iconCls)
        return (
            <div staticClass='m-text-field' class={wrapCls}>
                {this.hasIcon && (<MIcon name={this.icon}/>)}

                <div staticClass='m-text-field__content' class={contenCls}>
                    <div   staticClass='m-text-field__label' class={labelCls} onClick={this.handleFocus}>
                        {this.label}
                    </div>
                    <div staticClass='m-text-field__input-wrap' class={inputWrapCls}>
                        {
                            this.hasPrefix &&
                            (<span staticClass='m-text-field__suffix'
                                   v-show={this.isFocus || this.hasText}>{this.prefix}</span>)
                        }

                        {!this.multiLine ?
                            (
                                <input
                                    disabled={this.disabled}
                                    ref="input"
                                    v-model={this.text}
                                    type="text"
                                    staticClass='m-text-field__input'
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}/>
                            ) : (
                                <textarea
                                    ref="input"
                                    v-model={this.text}
                                    onFocus={this.handleFocus}
                                    onBlur={this.handleBlur}
                                    staticClass='m-text-field__input'
                                    rows={this.rows}/>
                            )}

                        {this.hasSuffix && (<span staticClass='m-text-field__suffix'>{this.suffix}</span>)}
                    </div>
                    {this.hasEndIcon && (<MIcon class={iconCls} name={this.endIcon}/>)}
                    <div staticClass='m-text-field__underline' class={underlineCls}>
                        <div
                            staticClass='m-text-field__underline-content m--bg-m-text-field__underline-content'
                            class={underlineContentCls}/>
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
            </div>
        )
    }
}
