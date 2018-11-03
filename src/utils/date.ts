/**
 * 判断闰年
 * @return {boolean}
 */
Date.prototype.isLeapYear = function() {
    return (0 === this.getFullYear() % 4
            && (
                (this.getFullYear() % 100 !== 0)
                || (this.getFullYear() % 400 === 0)
                )
            )
}
/**
 * 当月最大天数
 * @return {number}
 */
Date.prototype.maxDayOfMonth = function() {
    return (32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate())
}
/**
 * 当月第一天所在星期
 * @return {number}
 */
Date.prototype.firstWeekDay = function() {
    const temp = new Date(this)
    temp.setDate(1)
    return temp.getDay()
}
/**
 * 补零
 * @return {string}
 */
Number.prototype.dateZeroize = function() {
    const value = this.toString()
    return value.length > 1 ? value : `0${value}`
}
// Date.prototype.getZeroize = function(type){
//     let value = ''
//     switch (type){
//         case 'month': value = this.getMonth().toString(); break;
//         case 'date': value = this.getDate().toString(); break;
//         case 'hours': value = this.getHours().toString(); break;
//         case 'minutes': value = this.getMinutes().toString(); break;
//         case 'seconds': value = this.getSeconds().toString(); break;
//     }
//     return value.length === 2 ? value : `0${value}`
// }



