/**
 * Created by nocoolyoyo on 2018/6/23.
 */
import Palettes from './palettes'
import Elevations from './elevations'

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
        icon: {
            bgColor: Palettes.lightblue_A700,
            color: 'white',
            elevations: Elevations[3]
        },
    }
}

function rend() {

}

/**
 * 主题注册
 */
export function register() {
    //todo:主题校验

}

/**
 * 获取主题
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