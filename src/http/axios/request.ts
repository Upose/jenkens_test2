/*
 * @Description: 配置get 和 post请求
 * @version:
 * @Author: TJ
 * @Date: 2021-03-29 17:23:20
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-27 18:02:33
 */

// request.ts
import instance from './index'
import { Base64 } from 'js-base64'
import { IParams } from '@/@types/httpInterface'
import i18n from '@/locales'
export default class Request {
  //# get方法
  static get = (url: string, params?: object) => {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params: params })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // 上传图片方法
  static uploadPost = (url: string, params: object) => {
    return new Promise((resolve, reject) => {
      instance
        .post(url, params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // post方法
  static post = (url: string, params?: IParams) => {
    return new Promise((resolve, reject) => {
      instance
        .post(url, {
          encryption_type: 'base64',
          data: Base64.encode(JSON.stringify(params))
        })
        .then((res: any) => {
          /***********************筛选出页面展示的按钮**********************/
          res.power = res.power?.filter((item: any) => item.widget_type === 1)
          /***********************筛选出页面展示的按钮**********************/
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // 上传pdf,post方法
  static pdfpost = (url: string, params?: IParams) => {
    return new Promise((resolve, reject) => {
      instance
        .post(
          url,
          {
            encryption_type: 'base64',
            data: Base64.encode(JSON.stringify(params))
          },
          { responseType: 'blob' }
        )
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
