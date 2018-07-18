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


