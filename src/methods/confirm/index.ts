import MModal from '@/components/modal'
import { Component } from 'vue-property-decorator'
import { Model } from '@/types'


class Confirm extends MModal {
 public resolve!: () => void
 public reject!: () => void
 private el = document.createElement('div')
 public confirm() {
  console.log('$confirm')
  super.confirm()
  this.resolve()
 }
 public cancel() {
  super.cancel()
  this.reject()
 }
 public afterLeave() {
  this.$destroy()
 }
}

const confirm = async (options: Model.ConfirmOptions) => {
 return new Promise(async (resolve, reject) => {
  const instance = new Confirm()
  instance.resolve = resolve
  instance.reject = reject
  instance.$mount()
  instance.domExist = true
  await instance.$nextTick()
  instance.selfShow = true
 })
}
export default confirm
