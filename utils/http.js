import config from '../config.js'
import {
  tips
} from './error.js'

class HTTP {
  request({
    url,
    data,
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.api_url + url,
        data,
        method,
        header: {
          'content-type': 'application/json',
          'appkey': config.appKey
        },
        success: res => {
          const code = res.statusCode + '',
                data = res.data
          if (code.startsWith('2')) {
            resolve(data)
          } else {
            this._show_error(data.error_code)
            reject()
          }
        },
        fail: err => {
          this._show_error()
          reject(err)
        }
      })
    })
  }
  _show_error(error_code = 1) {
    wx.showToast({
      title: tips[error_code],
      icon: 'none'
    })
  }
}
1
export default HTTP