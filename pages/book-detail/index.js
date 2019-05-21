// pages/book-detail/index.js
import BookModel from '../../models/book.js'
import LikeModel from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: {},
    comments: [],
    like: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      bid
    } = options
    Promise.all([
      bookModel.getBookDetail(bid),
      bookModel.getBookComment(bid),
      bookModel.getBookFavor(bid)
    ]).then(res => {
      this.setData({
        book: res[0],
        comments: res[1].comments,
        like: res[2].like_status,
        likeCount: res[2].fav_nums
      })
    })
  },
  onLike(event) {
    const {
      behavior
    } = event.detail
    const {
      id
    } = this.data.book
    likeModel.like(behavior, id, 400)
  },
  onFakePost() {
    this.setData({
      posting: true
    })
  },

  onCancel() {
    this.setData({
      posting: false
    })
  },
  onPost(event) {
    const comment = event.detail.value || event.detail.text
    if (!comment) return

    if (comment.length > 12) return

    bookModel.addShortComment({
      id: this.data.book.id,
      content: comment
    }).then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})