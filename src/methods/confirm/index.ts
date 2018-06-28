import MModal from '@/components/modal'
const confirm = async () => {
 const instance = new MModal({
  el: document.createElement('div'),
 })
 instance.$mount()
 instance.domExist = true
 await instance.$nextTick()
 instance.selfShow = true
}
export default confirm
