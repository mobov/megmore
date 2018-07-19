/**
 * 判断闰年
 * @return {boolean}
 */
Date.prototype.isLeapYear = function() {
    return (0 === this.getFullYear()%4 &&
           ((this.getFullYear()%100 !==0)||
           (this.getFullYear()%400 === 0)))
}
/**
 * 当月最大天数
 * @return {number}
 */
Date.prototype.maxDayOfMonth = function(){
    return (32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate())
}
/**
 * 当月第一天所在星期
 * @return {number}
 */
Date.prototype.firstWeekDay = function(){
    const temp = new Date(this)
    temp.setDate(1)
    return temp.getDay()
}
/**
 * 获取补零月份
 */
Date.prototype.getZeroizeMonth = function(){
    const value = this.getMonth().toString()
    return value.length === 2 ? value : `0${value}`
}
/**
 * 获取补零小时
 */
Date.prototype.getZeroizeHours = function(){
    const value = this.getHours().toString()
    return value.length === 2 ? value : `0${value}`
}
/**
 * 获取补零分钟
 */
Date.prototype.getZeroizeMinutes = function(){
    const value = this.getMinutes().toString()
    return value.length === 2 ? value : `0${value}`
}



