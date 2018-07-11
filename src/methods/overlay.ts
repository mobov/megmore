import MOverlay from '@/components/base/overlay'
import { Component, Vue } from 'vue-property-decorator'
import { ComponentOptions, VNode } from 'vue';
import { getZIndex } from '@/utils'
import modalManage from '@/mixins/modal/modalManage'
import { Model } from '@/types'
let instance: Overlay | null;
@Component
class Overlay extends MOverlay {

}

export const openOverlay = async (options: Model.ConfirmOptions = { title: '', content: '' }) => {

    if (!instance) {
        instance = new Overlay()
        instance.$mount()
        await instance.$nextTick()
        instance.show = true
    }
    console.log(modalManage.last)
    instance.$el.style.zIndex = String(Number(modalManage.last.$el.style.zIndex) - 1)
}
export const closeOverlay = async () => {
    if (modalManage.instances.length === 0) {
        (instance as Overlay).show = false
        instance = null
    } else if (instance) {
        instance.$el.style.zIndex = String(Number(modalManage.last.$el.style.zIndex) - 1)
    }
}