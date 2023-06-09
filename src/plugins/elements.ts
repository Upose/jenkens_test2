/*
 * @Description: element结合i18n国际化处理
 * @version:
 * @Author: TJ
 * @Date: 2021-05-06 11:51:09
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-10 13:42:13
 */
// import '@/assets/css/element-variables.scss'//生效了
// import 'element-plus/packages/theme-chalk/src/base.scss'
import 'element-plus/lib/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import i18n from '@/locales'

export default function loadComponent(app: any) {
  app.use(ElementPlus, { size: 'mini', i18n: i18n.global.t })
}
