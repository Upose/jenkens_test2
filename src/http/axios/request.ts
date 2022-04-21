/*
 * @Descripttion: 配置get 和 post请求
 * @version:
 * @Author: TJ
 * @Date: 2021-03-29 17:23:20
 * @LastEditors: HYH
 * @LastEditTime: 2021-09-02 14:44:15
 */

// request.ts
import instance from './index'
import qs from 'qs' //  后台不需要序列化 ======= JSON
import { Base64 } from 'js-base64'
import { IParams } from '@/@types/httpInterface'
export default class Request {
  //# get方法
  static get = (url: string, params?: object) => {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params: params })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 上传图片方法
  static uploadPost = (url: string, params: object) => {
    return new Promise((resolve, reject) => {
      instance
        .post(url, params)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
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
          data: Base64.encode(JSON.stringify(params)),
        })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
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
            data: Base64.encode(JSON.stringify(params)),
          },
          { responseType: 'blob' }
        )
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
