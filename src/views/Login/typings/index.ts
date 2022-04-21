/*
 * @Descripttion:
 * @version:
 * @Author: TJ
 * @Date: 2021-03-25 09:24:20
 * @LastEditors: XJ
 * @LastEditTime: 2021-06-08 18:02:19
 */
// ================= 定义登录页面数据对象类型

// =====================================数据类型=============================

//#   语言数组类型
interface IUserInfo {
  username: string
}

// 登录form表单类型
interface ILoginForm {
  username: string
  password: string
}

export { ILoginForm, IUserInfo }
