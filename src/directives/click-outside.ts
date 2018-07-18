import Vue, { VNode } from 'vue';
import { on } from '@/utils/dom'

const ctx = 'm-clickoutside-context';

interface Node extends Element {
 [ctx]: {
  id: number,
  documentHandler: (e: MouseEvent, startClick: MouseEvent) => void,
  methodName: string,
  bindingFn: () => void,
 }
}
const nodeList: Node[] = []// 点击发生在这些列表中的元素之外时触发


let startClick: MouseEvent;
let seed = 0;



on(document, 'mousedown', (e: MouseEvent) => { startClick = e })
on(document, 'mouseup', (e: MouseEvent) => {
 const checkDom = nodeList.some((node) => {// 元素在白名单某个DOM内部
  return node.contains((e.target as Element) || startClick.target)
 })
 if (!checkDom) {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
 }
})
function createDocumentHandler(el: Node, binding: any, vnode: any) {
 return (mouseup: MouseEvent, mousedown: MouseEvent) => {
  const target1 = mouseup.target as Node
  const target2 = mousedown.target as Node
  if (el.contains(target1) || el.contains(target2) || nodeList.includes(target1) || nodeList.includes(target1)) {
   return
  }

  if (binding.expression &&
   el[ctx].methodName &&
   vnode.context[el[ctx].methodName]) {
   vnode.context[el[ctx].methodName]();
  } else {
   el[ctx].bindingFn && el[ctx].bindingFn();
  }
 };
}


export default {
 name: 'm-click-outside',
 bind(el: Node, binding: any, vnode: VNode) {
  nodeList.push(el);
  const id = seed++;
  el[ctx] = {
   id,
   documentHandler: createDocumentHandler(el, binding, vnode),
   methodName: binding.expression,
   bindingFn: binding.value
  };
 },

 update(el: Node, binding: any, vnode: VNode) {
  el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
  el[ctx].methodName = binding.expression;
  el[ctx].bindingFn = binding.value;
 },

 unbind(el: Node) {
  let len = nodeList.length;

  for (let i = 0; i < len; i++) {
   if (nodeList[i][ctx].id === el[ctx].id) {
    nodeList.splice(i, 1);
    break;
   }
  }
  delete el[ctx];
 }
};
