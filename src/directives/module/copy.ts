/*
 * @Description:复制某个值至剪贴板
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 11:44:26
 */
/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
 import type { Directive, DirectiveBinding } from "vue";
 import { ElMessage } from "element-plus";
 interface ElType extends HTMLElement {
   copyData: string | number;
   click: any;
 }
 const copy: Directive = {
   mounted(el: ElType, binding: DirectiveBinding) {
     el.copyData = binding.value;
     el.addEventListener("click", handleClick);
   },
   updated(el: ElType, binding: DirectiveBinding) {
     el.copyData = binding.value;
   },
   beforeUnmount(el: ElType) {
     el.removeEventListener("click", el.click);
   }
 };
 
 function handleClick(this: any) {
  //  const input = document.createElement("input");
  //  input.value = this.copyData.toLocaleString();
  //  document.body.appendChild(input);
  //  input.select();
  //  document.execCommand("Copy");
  //  document.body.removeChild(input);
  // 上面的方法提示（document.execCommand("Copy");）即将废弃 用下面这个代替
  navigator.clipboard.writeText(this.copyData.toLocaleString()).then(() =>ElMessage.success("复制成功"))
 }
 
 export default copy;
 