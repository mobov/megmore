import MModal from '@/components/modal'
const confirm = async () => {
 const instance = new MModal({
  el: document.createElement('div'),
  async mounted() {
   instance.domExist = true
   await instance.$nextTick()
   // instance._value = true
  },
 })
 const body = document.querySelector('body')
 instance.$mount()
}
export default confi