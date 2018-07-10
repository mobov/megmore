/**
 * Created by nocoolyoyo on 2018/6/23.
 */
import Palettes from '@/components/megmore/palettes'
import Elevations from '@/components/megmore/elevations'

const currentTheme = 'unicon'

const Theme: any = {
    unicon: {
        theme: {
            primary: Palettes.lightblue_A700,
            danger: Palettes.red_300,
            warning: Palettes.red_300,
            success: Palettes.orange_700,
            info: Palettes.cyan_400,
        },
        appBar: {
            bgColor: Palettes.lightblue_A700,
            color: 'white',
        },
        spinPath: {
            stroke: Palettes.lightblue_A700,
        },
    },
}

/**
 * todo://抽离进es-treasure
 * @param {string} name
 * @return {string}
 */
function midlineCase(name: string): string {
    const SPECIAL_CHARS_REGEXP = /([A-Z])/g
    return name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => {
        return offset ? '-' + separator.toLowerCase() : letter
    })
}

/**
 * 属性映射规则
 * @type {{bgColor: string; elevation: string[]}}
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
    Object.keys(attrData).forEach(attrName => {
        tempText += `[data-megmore-theme=${name}] .bg-${midlineCase(attrName)} {
                        background-color: ${attrData[attrName]}
                    }\n`
        tempText += `[data-megmore-theme=${name}] .color-${midlineCase(attrName)} {
                        color: ${attrData[attrName]}
                    }\n`
        tempText += `[data-megmore-theme=${name}] .line-${midlineCase(attrName)} {
                        border-color: ${attrData[attrName]}
                    }\n`
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
 * 修饰符样式构造
 */
function collectModifyStyles(name: string) {
    const { theme } = Theme[name]
    let str = ''
    Object.keys(theme).forEach(key => {
        str += `.color--${key} \{color:${theme[key]}\}\n`
        str += `.bg--${key} \{background-color:${theme[key]}\}\n`
    })
    return str
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
            context += collectModifyStyles(name)
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
