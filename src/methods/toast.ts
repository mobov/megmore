import Vue from 'vue'
import MToast from '@/components/toast'
import * as Model from '@/types/model'
interface IToastoptions {
    type?: Model.Color
}
const defaultOptions: IToastoptions = {
    type: 'default',
}
const instaceList: MToast[] = []

class Toast extends MToast {
    public el = document.createElement('div')
    // public visible = true
    public type: Model.Color
    public message: string
    public constructor(msg: string, options: IToastoptions) {
        super()
        console.log(msg)
        this.message = msg
        this.type = options.type as string
    }

    public afterLeave() {
        console.log(MToast.componentOptions.Ctor.options)
        MToast.componentOptions.Ctor.options.methods.afterLeave.call(this)
        const index = instaceList.findIndex(i => i === this)
        instaceList.splice(index, 1)
    }
}
export default async (msg = '啊啊啊啊啊啊啊啊啊啊', options: IToastoptions = defaultOptions) => {
    const o = Object.assign({
        ...options,
        ...defaultOptions,
    })

    const instance = new Toast(msg, options)
    instaceList.push(instance)
    instance.$mount()
    await Vue.nextTick()
    console.log(instance)
    instance.visible = true

}
