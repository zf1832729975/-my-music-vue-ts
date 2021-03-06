import axios from 'axios'
import { Message, Notification } from 'element-ui'
import { getAuthCookie } from '@/utils'

// 创建axios实例
const service = axios.create({
  withCredentials: true,
  // baseURL: 'http://localhost:3000',
  // baseURL: 'http://47.100.52.255:3000',
  baseURL: BASE_URL,
  // url: ':3000',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  // timeout: 20000 // 请求超时时间
  timeout: 30000 // 请求超时时间
})

service.interceptors.request.use(
  config => {
    // let accessToken = getAuthCookie()
    // if (accessToken) {
    //   config.headers['Authorization'] = 'Bearer ' + accessToken // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }
    // if (config.headers.type === 'form') {
    //   config.data = qs.stringify(config.data)
    // }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      switch (response.data.code) {
        case 401: // 用户未登录
          break
        case 502:
          console.log(response.data.msg)
          // Message({
          //   message: response.data.msg || '似乎没有网络哦, 请检查当前网络',
          //   type: 'error'
          //   // center: true
          // })
          Notification.error({
            message: response.data.msg || '似乎没有网络哦, 请检查当前网络',
            title: '提示'
            // center: true
          })
          break
        default:
          console.log(response.data.msg)
          Message({
            message: response.data.msg || '未知错误',
            type: 'error'
            // center: true
          })
          break
      }
      return Promise.reject(response)
    } else {
      return response.data
    }
  },
  error => {
    if (error.response) {
      const res = error.response.data
      if (res.msg) {
        Notification.error({
          message: res.msg || '未知错误',
          title: '提示'
          // center: true
        })
      }
      return Promise.reject(res)
    } else {
      return Promise.reject(error)
    }
  }
)

export default service
