import HTTP from '../utils/http.js'

class ClassicModel extends HTTP {
  getClassicLatest() {
    return this.request({
      url: '/classic/latest'
    }).then(res => {
      const key = this._getKey(res.index)
      wx.setStorageSync(key, res)
      return Promise.resolve(res)
    })
  }
  getCurrentClassic(index, nextOrPrev) {
    const key = nextOrPrev === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    const classic = wx.getStorageSync(key)
    if (!classic) {
      const next = nextOrPrev === 'next' ? 'next' : 'previous'
      return this.request({
        url: `/classic/${index}/${next}`
      }).then(res => {
        wx.setStorageSync(key, res)
        return Promise.resolve(res)
      })
    } else {
      return Promise.resolve(classic)
    }
  }
  isFirst(index) {
    return index === 1
  }
  isLatest(index) {
    return index === this.getLatestIndex()
  }
  saveLatestIndex(index) {
    wx.setStorageSync('wx-latest', index)
  }
  getLatestIndex() {
    return wx.getStorageSync('wx-latest')
  }
  _getKey(index) {
    return 'classic-' + index
  }
}

export default ClassicModel