/*
 * @Description: 按钮/输入框 防抖指令
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 11:27:54
 */
import type { Directive, DirectiveBinding } from "vue";
interface ElType extends HTMLElement {
	click: () => any;
}
interface bindingValue{
	value:{
		fn:()=>void,
		delay:number
	}
}
const debounce: Directive = {
	mounted(el: ElType, binding: bindingValue) {
		let timer:any= null;
		el.click = function () {
			if (timer) {
				clearInterval(timer);
			}
			timer = setTimeout(() => {
				binding.value.fn();
			}, binding.value.delay||500);
		};
		el.addEventListener("click", el.click);
	},
	beforeUnmount(el: ElType) {
		el.removeEventListener("click", el.click);
	}
};

export default debounce;
