/**
 * Created by nocoolyoyo on 2018/6/23.
 */
import Palettes from './palettes'
import Elevations from './elevations'

let currentTheme = 'unicon'

let Theme : any = {
    unicon: {
        themePrimary: Palettes.lightblue_A700,
        themeDanger: Palettes.red_300,
        themeWarning: Palettes.red_300,
        themeSuccess: Palettes.orange_700,
        themeInfo: Palettes.cyan_400,
        appBar: {
            bgColor: Palettes.lightblue_A700,
            color: 'white',
            elevations: Elevations[3]
        },
    }
}

/**
 * todo://抽离进es-treasure
 * @param {string} name
 * @return {string}
 */
function midlineCase(name: string) {
    let SPECIAL_CHARS_REGEXP = /([A-Z])/g;
    return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? '-' + separator.toLowerCase() : letter
    })
}

/**
 * 构造样式表内容
 * @param name
 * @param data
 * @return {string}
 */
function getThemeContext(name: string, data: any) {
    let context = '@charset "utf-8" '
    Object.keys(data).forEach(attribute =>{
        context += `[data-megmore-theme=${name}] `
        if(data[attribute] instanceof Object){
            const subData = data[attribute]
            context += ` .m-${midlineCase(attribute)}{`
            Object.keys(subData).forEach(subAttribute =>{
                if(subAttribute === 'bgColor'){
                    context += `background-color: ${subData[subAttribute]};
                    `
                }else if(subAttribute === 'elevations'){
                    context += `box-shadow: ${subData[subAttribute]};
                                -webkit-box-shadow: ${subData[subAttribute]};
                    `
                }else{
                    context += `${subAttribute}: ${subData[subAttribute]};
                    `
                }
            })
            context += `}`
        }else{
            context += ` .${midlineCase(attribute)}-bg{ 
                    background-color: ${data[attribute]}
                }`
            context += ` .${midlineCase(attribute)}-color{
                    color: ${data[attribute]}
                }`
        }
    })
    console.log(new Date().getTime())

    return context
}
/**
 * 使用主题
 * @param {string} name
 */
export function useTheme(name: string) {
    const themeConf = Theme[name] ? Theme[name] : Theme.unicon
    if(document.head.querySelector(`#theme-${name}`)){
        const $themeStyle = document.head.querySelector(`#theme-${name}`)
        const $themeText = document.createTextNode(getThemeContext(name, themeConf))
        $themeStyle.childNodes[0] = $themeText
    }else{
        const $themeStyle = document.createElement('style')
        $themeStyle.setAttribute('id', 'theme-unicon')
        $themeStyle.setAttribute('type', 'text/css')
        const $themeText = document.createTextNode(getThemeContext(name, themeConf))
        $themeStyle.appendChild($themeText)
        document.head.appendChild($themeStyle)
        document.body.dataset.megmoreTheme = name
    }

}
/**
 * 主题注册
 */
export function registerTheme() {
    //todo:主题校验

}

/**
 * 获取主题配置
 * @param {string} name
 * @return {any}
 */
export function getTheme(name: string){
    if(Theme[name]){
        return Theme[name]
    }else{
        return Theme.unicon
    }
}