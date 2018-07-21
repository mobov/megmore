/**
 * Created by nocoolyoyo on 2018/7/13.
 */
interface Date {
    isLeapYear(): boolean
    maxDayOfMonth(): number
    firstWeekDay(): number
    getZeroize(type: string): string
}
interface Number {
    dateZeroize(): string
}