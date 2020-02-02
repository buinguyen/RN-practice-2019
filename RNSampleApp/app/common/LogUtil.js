export default class LogUtil {
    constructor(props) {
        this.print = this.print.bind(this)
    }

    static log(tag, mes) {
        console.log(tag + ":" + mes)
    }
}