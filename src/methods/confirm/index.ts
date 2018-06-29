import MModal from '@/components/modal'
import { Component, Vue } from 'vue-property-decorator'
import { ComponentOptions } from 'vue';
import { Model } from '@/types'

@Component
class Confirm extends MModal {
 public resolve!: () => void
 public reject!: () => void
 public title!: string
 public confirm() {
  MModal.options.methods.confirm.call(this)
  this.resolve()
 }
 public cancel() {
  MModal.options.methods.cancel.call(this)
  this.reject()
 }
 public afterLeave() {
  this.$destroy()
 }
}

const confirm = async (options: Model.ConfirmOptions = { title: '', content: '' }) => {
 return new Promise(async (resolve, reject) => {
  const instance = new Confirm()
  instance.title = options.title as string
  instance.content = options.content as (string | Model.Render)
  instance.resolve = resolve
  instance.reject = reject
  instance.$mount()
  instance.domExist = true
  await instance.$nextTick()
  instance.selfShow = true
 })
}
export default confirm
