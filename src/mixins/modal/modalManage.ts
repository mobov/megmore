import Vue from 'vue'
import { ModalComponent } from '@/types';
interface PopupManager {
 instances: ModalComponent[],
 open: (v: Vue) => void,
 close: (v: Vue) => void
}
const popupManager: PopupManager = {
 instances: [],   //  保存已打开的弹窗类组件实例
 open(instance: Vue) {
  if (!instance) {
   return
  }
  if (this.instances.includes(instance)) {
   return
  }
  this.instances.push(instance)
 },
 close(instance: Vue) {
  const index = this.instances.indexOf(instance)
  if (index === -1) {
   return
  }
  this.instances.splice(index, 1);
 }
}


if (typeof window !== 'undefined') {
 window.addEventListener('keydown', (e) => {
  if (popupManager.instances.length === 0 || e.code !== 'Escape'){
   return
  }
  const instance = popupManager.instances[popupManager.instances.length - 1]
  if (instance.escPress) {
   instance.escPress()
  }
 })
}

export default popupManager
