import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

// You can declare a mixin as the same style as components.
@Component
export default class ModalMixin extends Vue {
 @Prop({
  default: true,
 })
 public value!: boolean

 get _value(): boolean {
  return this.value
 }
 set _value(val: boolean) {
  this.$emit('input', val)
 }

 get dom():HTMLElement{
  return this.$el
 }

 private mounted() {
  document.body.appendChild(this.$el)
 }
}
