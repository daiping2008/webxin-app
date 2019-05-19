import HTTP from '../utils/http.js'

class ClassicModel extends HTTP {
  getClassicLatest() {
    return this.request({
      url: '/classic/latest'
    })
  }
  getCurrentClassic(index, nextOrPrev) {
    const next = nextOrPrev === 'next' ? 'next' : 'previous'
    return this.request({
      url: `/classic/${index}/${next}`
    })
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
}

export default ClassicModel