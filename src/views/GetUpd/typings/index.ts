/*
 * @Descripttion:
 * @version:
 * @Author: XJ
 * @Date: 2021-06-17 09:39:05
 * @LastEditors: XJ
 * @LastEditTime: 2021-06-17 15:35:06
 */
export interface IState {
  showStep: boolean
  stepOneForm: {
    username: string
    email: string
    code: string
    countDown: number | null
  }
  stepTwoForm: {
    password: string
    rePassword: string
  }
}
