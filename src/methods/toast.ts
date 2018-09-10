import Vue from 'vue'
import MToast from '@/components/toast'
import * as Model from '@/types/model'
interface IToastoptions {
    type?: Model.Color,
    timeout: number,
}
const defaultOptions: IToastoptions = {
    type: 'default',
    timeout: 3000,
}
const instanceList: MToast[] = []

class Toast extends MToast {
    public el = document.createElement('div')
    // public visible = true
    public type: Model.Color
    public message: string
    public constructor(msg: string, options: IToastoptions) {
        super()
        this.message = msg
        this.type = options.type as Model.Color
        // setTimeout(() => {
        //     this.visible = false
        // }, options.timeout);
    }

    public afterLeave() {
        MToast.componentOptions.Ctor.options.methods.afterLeave.call(this)
        const index = instanceList.findIndex(i => i === this)
        instanceList.splice(index, 1)
    }
}
export default async (msg = '啊啊啊啊啊啊啊啊啊啊', options: IToastoptions = defaultOptions) => {
    const o = Object.assign({
        ...defaultOptions,
        ...options,
    })
    console.log(o)
    const instance = new Toast(msg, o)
    instanceList.push(instance)
    instance.$mount()
    await Vue.nextTick()
    instance.visible = true
}
