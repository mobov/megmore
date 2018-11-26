class Cache {

    private BUFFER: any = {}

    public getItem(key: string): any {
        return this.BUFFER[key]
    }

    public setItem(key: string, val: any): void {
        this.BUFFER[key] = val
    }

    public exist(key: string): boolean {
        return this.BUFFER.hasOwnProperty(key)
    }
}

export const HoverColor = new Cache()
