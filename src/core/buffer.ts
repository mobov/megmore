class Buffer {

    private docStylesVal: any | boolean = false
    /**
     * 根文档样式表
     * @return {{}}
     */
    public get docStyles() {
        if (!this.docStylesVal) {
            this.docStylesVal = getComputedStyle(document.documentElement)
        }
        return this.docStylesVal
    }
}

export default new Buffer()
