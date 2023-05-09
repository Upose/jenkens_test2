/*
 * @Descripttion: axios 封装入口文件
 * @version:
 * @Author: TJ
 * @Date: 2021-03-29 16:36:39
 * @LastEditors: TJ
 * @LastEditTime: 2022-12-07 13:16:49
 */
import * as codes from '@/constant/code'
import { MutationConstants, GetterConstants } from '@/store/modules/users/constants'
import { useStore } from '@/store'
import ElMessage from '@/utils/resetMessage'
import { Base64 } from 'js-base64' //加密方法
import axios, { AxiosRequestConfig, Method } from 'axios' //这个是官方方法
import { ElLoading } from 'element-plus'
import { getNewToken } from '@/utils/getNewToken'
import { removeUserId, getUserId } from '@/utils/cookie'
import router from '@/router'
import { useRoute } from 'vue-router'
// 定义接口
interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: Function
}
const store = useStore()
// 取消重复请求
const pending: Array<PendingType> = [] //泛型数组里面是peddingType类型
const CancelToken = axios.CancelToken //axios.CancelToken用来取消请求
// axios 实例
const instance = axios.create({
  // baseURL: 'http://192.168.10.225:8082',
  baseURL: process.env.VUE_APP_QIHONG_URL,
  timeout: 300000,
  responseType: 'json'
})

//#  定义加载loading...
let loadingInstance: any
function startLoading() {
  //loading-start 方法
  loadingInstance = ElLoading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.0)'
    // background: 'rgba(1, 1, 1,)',
  })
}

//#  loading关闭函数
function endLoading() {
  // loading-close 方法
  loadingInstance.close()
}
// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行取消操作
    // 是否是在上传图片，是的话就不取消重复请求
    let isUploadImg = list.data instanceof FormData
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data) &&
      !isUploadImg
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}
// 出现刷新token请求
let userId = getUserId()

// 添加请求拦截器
instance.interceptors.request.use(
  async function(request) {
    // 移除重复请求
    removePending(request)
    startLoading()
    // 若不是自动登录请求，且正在刷新token，则刷新token后当前请求再继续

    if (getNewToken.currentUrlIsAutoLogin(request.url)) {
      await getNewToken.apiRefreshToken()
    }
    request.cancelToken = new CancelToken(c => {
      pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c
      })
    })
    // 读取token值
    let token = store.getters[GetterConstants.GET_TOKEN]
    if (token) {
      request.headers['accesstoken'] = token
    }
    return request
  },
  function(error) {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(
  // 任何2xx范围内的状态代码都会触发此函数
  async function(response) {
    // 移除重复请求
    removePending(response.config)
    endLoading()
    if (response.headers.authorization) {
      let token = response.headers.authorization
      store.commit(MutationConstants.SET_TOKEN, token)
    }
    const responseData = response?.data?.data
    const reponsrType = JSON.parse(Base64.decode(responseData))
    const ERRCOR_CODE = reponsrType.status
    // 刷新token后重发请求，然后继续渲染
    if (ERRCOR_CODE === codes.CODE_TOKEN_ABNORMAL || ERRCOR_CODE === codes.CODE_TOKEN_VERIFY) {
      if (userId) {
        let newToken = await getNewToken.apiRefreshToken()
        // 将新的Token设置到axios的默认请求头
        // axios.defaults.headers.common['token'] = newToken
        // 将新的Token设置到重发的请求头
        response.config.headers.accesstoken = newToken
        // 请求重发
        return Promise.resolve(instance.request(response.config))
      } else {
        router.push('/login')
        return Promise.reject()
      }
    }
    switch (ERRCOR_CODE) {
      case codes.CODE_SUCCESS:
        // 成功直接退出
        break
      case codes.CODE_NOT_PERMISSION:
        router.push('/noaccess')
        break
      // case codes.CODE_TOKEN_ABNORMAL: //token信息不存在401
      // 	if (userId) {
      // 		getNewToken()
      // 	} else {
      // 		router.push('/login')
      // 	}
      // 	break
      // case codes.CODE_TOKEN_VERIFY: //token失效402
      // 	if (userId) {
      // 		getNewToken()
      // 	} else {
      // 		router.push('/login')
      // 	}
      // 	break
      case codes.CODE_FORM_TIP:
        // #后端校验 表单报错
        // ElMessage({
        //   type: 'warning',
        //   message: reponsrType.info,
        // })
        break
      case codes.CODE_HANDLE_DATA:
        ElMessage.warning(reponsrType.info)
        break
      case codes.CODE_HANDLE_DATA:
        ElMessage.warning(reponsrType.info)
        break
      default:
        ElMessage.warning('未知错误')
        break
    }
    // 解码之后返回解码后的数据
    return reponsrType
  },
  // 任何超出2xx范围的状态码都会触发此函数
  function(error) {
    endLoading()
    //Cancel {message: '操作太频繁，请稍后再试'}
    const response = error?.response
    // 根据返回的http状态码做不同的处理
    switch (response?.status) {
      case codes.CODE_ERROR:
        // 服务端错误
        ElMessage({
          type: 'warning',
          message: '数据记载错误'
        })
        break
      default:
        ElMessage({
          type: 'warning',
          message: 'error_else'
        })
        break
    }

    // 超时重新请求
    // const config = error.config;
    // // 全局的请求次数,请求的间隙
    // const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

    // if (config && RETRY_COUNT) {
    //     // 设置用于跟踪重试计数的变量
    //     config.__retryCount = config.__retryCount || 0;
    //     // 检查是否已经把重试的总数用完
    //     if (config.__retryCount >= RETRY_COUNT) {
    //         return Promise.reject(response || { message: error.message });
    //     }
    //     // 增加重试计数
    //     config.__retryCount++;
    //     // 创造新的Promise来处理指数后退
    //     const backoff = new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve();
    //         }, RETRY_DELAY || 1);
    //     });
    //     // instance重试请求的Promise
    //     return backoff.then(() => {
    //         return instance(config);
    //     });
    // }

    // // eslint-disable-next-line
    return Promise.reject(response || { message: error.message })
  }
)

export default instance
