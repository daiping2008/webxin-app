import ClassicModel from '../../models/classic.js'
import LikeModel from '../../models/like.js'
const classicModel = new ClassicModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
    latest: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getClassicLatest()
      .then(res => {
        this.setData({
          classic: res
        })
        classicModel.saveLatestIndex(res.index)
      })
  },
  onLike(event) {
    const behavior = event.detail.behavior || ''
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext() {
    this._getCurrentClassic('next')
  },
  onPrev() {
    this._getCurrentClassic('prev')
  },
  _getCurrentClassic(nextOrPrev) {
    classicModel.getCurrentClassic(this.data.classic.index, nextOrPrev).then(res => {
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})