/**
 * Created by nocoolyoyo on 2018/6/23.
 */
import Color from 'color'
import Palettes from '@/components/megmore/palettes'
import Elevations from '@/components/megmore/elevations'

const currentTheme = 'unicon'

const Theme: any = {
    unicon: {
        theme: {
            pure: Palettes.grey_A100,
            legacy: Palettes.grey_A700,
            default: Palettes.grey_A100,
            primary: Palettes.lightblue_A700,
            danger: Palettes.red_300,
            warning: Palettes.red_300,
            success: Palettes.orange_700,
            info: Palettes.cyan_400,
        },
        appBar: {
            bgColor: Palettes.lightblue_A700,
            color: Palettes.grey_A100,
        },
        'spin__path': {
            stroke: Palettes.lightblue_A700,
        }
    },
}
/**
 * todo://抽离进es-treasure
 * @param {string} name
 * @return {string}
 */
function midlineCase(name: string): string {
    const SPECIAL_CHARS_REGEXP = /([A-Z])/g
    const BE_REGEXP = /([A-z]+)(\-[A-z]+)+__[A-z]+(\-[A-z]+)+/g
    if (BE_REGEXP.test(name)) {//   BEM原样输出
        return name
    }
    else {
        return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
            return offset ? '-' + separator.toLowerCase() : letter
        })
    }
}
/**
 * 属性映射规则
 * @type {{bgColor: string; elevation: string}}
 */

const themeFormatMap: any = {
    bgColor: 'background-color',
    elevation: 'box-shadow',
}
/**
 * 构造主题属性样式
 * @param {string} name
 * @param {string} selector
 * @param attrData
 * @return {string}
 */
function collectSpecialStyles(name: string, selector: string, attrData: any): string {
    let tempText = ''
    console.log()
    Object.keys(attrData).forEach(attrName => {

        // bg
        tempText += `[data-megmore-theme=${name}] .m--bg-${midlineCase(attrName)} {
                        background-color: ${attrData[attrName]}
                    }\n`
        // color
        tempText += `[data-megmore-theme=${name}] .m--color-${midlineCase(attrName)} {
                        color: ${attrData[attrName]}
                    }\n`
        // border
        tempText += `[data-megmore-theme=${name}] .m--line-${midlineCase(attrName)} {
                        border-color: ${attrData[attrName]}
                    }\n`

        const colorObj = Color(attrData[attrName])

        // hover
        if (colorObj.isDark()) {
            tempText += `[data-megmore-theme=${name}] .m--color-${midlineCase(attrName)}-hover:hover {
                    color: ${colorObj.lighten(.4)}
                    border-color: ${colorObj.lighten(.4)}
                }\n`
            tempText += `[data-megmore-theme=${name}] .m--bg-${midlineCase(attrName)}-hover:hover {
                    background-color: ${colorObj.lighten(.4)}
                }\n`
        } else {
            tempText += `[data-megmore-theme=${name}] .m--color-${midlineCase(attrName)}-hover:hover {
                    color: ${colorObj.darken(.2)}
                    border-color: ${colorObj.darken(.2)}
                }\n`
            tempText += `[data-megmore-theme=${name}] .m--bg-${midlineCase(attrName)}-hover:hover {
                    background-color: ${colorObj.darken(.2)}
                }\n`
        }


    })


    return tempText
}
/**
 * 构造属性样式
 * @param {string} name
 * @param {string} selector
 * @param attrData
 * @return {string}
 */
function collectSelectorStyles(name: string, selector: string, attrData: any): string {
    console.log(attrData)
    const modifies = Theme[name].theme

    //  普通状态样式构造
    let tempText = `[data-megmore-theme=${name}] .m-${midlineCase(selector)}{\n`
    Object.keys(attrData).forEach(attrName => {
        if (themeFormatMap[attrName]) {
            tempText += `${themeFormatMap[attrName]}: ${attrData[attrName]};\n`
        } else {
            tempText += `${attrName}: ${attrData[attrName]};\n`
        }
    })
    tempText += '}\n'

    return tempText
}

/**
 * 构造样式表
 * @param name
 * @param data
 * @return {string}
 */
function collectStyles(name: string, data: any): string {
    let context = '@charset "utf-8";\n'
    Object.keys(data).forEach(selector => {
        if (data[selector] instanceof Object) {
            if (selector === 'theme') {
                context += collectSpecialStyles(name, selector, data[selector])
            } else {
                context += collectSelectorStyles(name, selector, data[selector])
            }
            context += `\n`
        }
    })
    return context
}
/**
 * 使用主题
 * @param {string} name
 */
export function useTheme(name: string): void {
    const themeConf = Theme[name] ? Theme[name] : Theme.unicon
    if (!document.head.querySelector(`#theme-${name}`)) {
        const $themeStyle = document.createElement('style')
        $themeStyle.setAttribute('id', 'theme-unicon')
        $themeStyle.setAttribute('type', 'text/css')
        const $themeText = document.createTextNode(collectStyles(name, themeConf))
        $themeStyle.appendChild($themeText)
        document.head.appendChild($themeStyle)
    }
    document.body.dataset.megmoreTheme = name
}
/**
 * 主题注册
 */
export function registerTheme(): void {
    // todo:主题校验
}
/**
 * 获取主题配置
 * @param {string} name
 * @return {object}
 */
export function getTheme(name: string): object {
    if (Theme[name]) {
        return Theme[name]
    } else {
        return Theme.unicon
    }
}
