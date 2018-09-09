import { VNode, VNodeDirective, FunctionalComponentOptions } from 'vue'
import { isColor } from 'is-color-stop'

export { isColor }
// KeyboardEvent.keyCode aliases
export const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34
})

/**
 * @description 判断color是预设值关键字还是色值
 */
export const colorDetermine = (color: string, styleField: 'bg' | 'color') => {
  type clsMap = {
    [key: string]: boolean | string
  }
  const cls: clsMap = {}
  const style: clsMap = {}
  const styleKeyMap = {
    bg: 'backgroundColor',
    color: 'color',
  }
  if (!isColor(color)) {
    cls[`m--${styleField}-${color}`] = true
  } else {
    const styleKey = styleKeyMap[styleField]
    style[styleKey] = color
  }
  return {
    class: cls,
    style,
  }
}

// //十六进制颜色值的正则表达式
// const colorReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
// /**
//  * RGB颜色转换为16进制
//  * @param {string} rgbStr
//  * @return {string}
//  */
// export function color2Hex(rgbStr: string){
//     if(/^(rgb|RGB)/.test(rgbStr)){
//         const aColor = rgbStr.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",")
//         let strHex = "#"
//         for(let i = 0; i < aColor.length; i++){
//             let hex = Number(aColor[i]).toString(16)
//             if(hex === "0"){
//                 hex += hex
//             }
//             strHex += hex
//         }
//         if(strHex.length !== 7){
//             strHex = rgbStr
//         }
//         return strHex
//     }else if(colorReg.test(rgbStr)){
//         const aNum = rgbStr.replace(/#/,"").split("")
//         if(aNum.length === 6){
//             return rgbStr
//         }else if(aNum.length === 3){
//             let numHex = "#"
//             for(let i = 0; i < aNum.length; i++){
//                 numHex += (aNum[i]+aNum[i])
//             }
//             return numHex
//         }
//     }else{
//         return rgbStr
//     }
// }
// /**
//  * 16进制颜色转为RGB格式
//  * @param {string} hexStr
//  * @return {string}
//  */
// export function color2Rgb(hexStr: string){
//     let sColor = hexStr.toLowerCase()
//     if(sColor && colorReg.test(sColor)){
//         if(sColor.length === 4){
//             let sColorNew = "#"
//             for(let i = 1; i < 4; i++){
//                 sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1))
//             }
//             sColor = sColorNew
//         }
//         //处理六位的颜色值
//         const sColorChange = []
//         for(let i = 1; i < 7; i += 2){
//             sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)))
//         }
//         return "RGB(" + sColorChange.join(",") + ")"
//     }else{
//         return sColor
//     }
// }
// /**
//  * 16进制颜色混合为RGBA格式
//  * @param {string} hexStr
//  * @param {number} alpha
//  * @return {string}
//  */
// export function color2Rgba(hexStr: string, alpha: number = 0.5){
//     let sColor = hexStr.toLowerCase()
//     if(sColor && colorReg.test(sColor)){
//         if(sColor.length === 4){
//             let sColorNew = "#"
//             for(let i = 1; i < 4; i++){
//                 sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1))
//             }
//             sColor = sColorNew
//         }
//         //处理六位的颜色值
//         const sColorChange = []
//         for(let i = 1; i < 7; i += 2){
//             sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)))
//         }
//         return "RGBA(" + sColorChange.join(",") + ',' + alpha + ")"
//     }else{
//         return sColor
//     }
// }

