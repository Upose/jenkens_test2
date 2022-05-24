/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 14:55:40
 */
// /*
//  * @Description:按钮权限
//  * @Author: HYH
//  * @LastEditors: HYH
//  * @LastEditTime: 2022-05-24 14:17:30
//  */
//  import type { Directive, DirectiveBinding } from "vue";
// import store from "@/store";

// /**需要权限的按钮 */
//  const needPermissionList=store.state.users.operableLanguage.split(',')
//  console.log(needPermissionList);

//  interface ElType extends HTMLElement {
//    copyData: string | number;
//    click: any;
//  }
//  interface bindingData{
//    value:{
//      current:any,
//      all:any
//    }
//  }
//  const auth: Directive = {
//    mounted(el: ElType, binding: DirectiveBinding) {
//      console.log(el,binding);
//      //可以根据权限隐藏按钮
//     //  el.style.display='none'

//    },
//    updated(el: ElType, binding: DirectiveBinding) {
//      el.copyData = binding.value;
//    },
//    beforeUnmount(el: ElType) {
//      el.removeEventListener("click", el.click);
//    }
//  };
//  export default auth;
