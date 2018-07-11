import MModal from '@/components/modal'
import { Component, Vue } from 'vue-property-decorator'
import { ComponentOptions, VNode } from 'vue';
import { Model } from '@/types'
import { openOverlay, closeOverlay } from '@/methods/overlay'
@Component
class Confirm extends MModal {
  public resolve!: () => void
  public reject!: () => void
  public title!: string
  public confirm() {
    MModal.options.methods.confirm.call(this)// hack super.confirm()
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
    instance.content = options.content as (string | VNode)
    instance.resolve = resolve
    instance.reject = reject
    instance.$mount()
    instance.domExist = true
    await instance.$nextTick()
    instance.visible = true
  })
}
export default confirm
