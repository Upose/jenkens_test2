/*
 * @Description:
 * @version:
 * @Author: XJ
 * @Date: 2021-05-06 11:17:19
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-27 11:19:08
 */
//页面基础布局样式一
import '@/assets/icon/iconfont.css'
import { MutationConstants } from '@/store/modules/index/constants'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directives/index'
// 引入插件文件
import { loadAllPlugins } from './plugins'
const app = createApp(App)
loadAllPlugins(app)
app
  .use(store)
  .use(router)
  .use(directives)
  .mount('#app')

// #监听鼠标落下事件：存储控制可选择列的变量
document.addEventListener(
  'mousedown',
  (e: any) => {
    store.commit(MutationConstants.SET_SHOWCUSTOM, false)
  },
  {
    passive: false
  }
)

// 阻止整个页面所有的右击事件
// document.oncontextmenu = function() {
//   return false
// }
