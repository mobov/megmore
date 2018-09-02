import Vue from 'vue'
import * as Model from '@/types/model';
import { openOverlay, closeOverlay } from '@/methods/overlay'
interface PopupManager {
  instances: Model.ModalComponent[],
  open: (v: Model.ModalComponent) => void | undefined,
  close: (v: Model.ModalComponent) => void,
  closeLast: () => void,
  last: Model.ModalComponent
}
const popupManager: PopupManager = {
  instances: [],   //  保存已打开的弹窗类组件实例
  open(instance: Model.ModalComponent) {
    if (!instance) {
      return
    }
    if (this.instances.includes(instance)) {
      return
    }
    this.instances.push(instance)
    console.log(this.instances)
  },
  close(instance: Model.ModalComponent) {
    const index = this.instances.indexOf(instance)
    if (index === -1) {
      return
    }
    this.instances[index].visible = false
    this.instances.splice(index, 1);
    closeOverlay()
  },
  closeLast() {
    popupManager.close(this.last)
  },
  get last() {
    return popupManager.instances[popupManager.instances.length - 1]
  }
}


if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (popupManager.instances.length === 0 || e.code !== 'Escape') {
      return
    }
    const instance = popupManager.instances[popupManager.instances.length - 1]
    if (instance.escPress) {
      instance.escPress()
    }
  })
}

export default popupManager
