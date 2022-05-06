/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-04-22 17:09:41
 */
// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')
//导插件包
import dayjs from 'dayjs'
//导相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'
//导国际化插件i18n
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
const relTime = (strDate: any) => {
  // 实现获取相对时间逻辑  中文格式  相对时间-距离现在 strDate-字符串格式转时间格式
  return dayjs()
    .locale('zh-cn')
    .from(strDate)
}
