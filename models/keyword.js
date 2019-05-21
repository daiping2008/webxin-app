import HTTP from '../utils/http.js'

class KeywordModel extends HTTP {
  key = 'wx-q'
  maxLen = 10
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  getHis() {
    return wx.getStorageSync(this.key) || []
  }
  setHis(keyword) {
    const his = wx.getStorageSync(this.key) || []
    const has = his.includes(keyword)
    if (!has) {
      if (his.length >= this.maxLen) his.pop()
      his.unshift(keyword)
      wx.setStorageSync(this.key, his)
    }
  }
}

export default KeywordModel