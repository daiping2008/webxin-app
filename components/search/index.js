// components/search/index.js
import pagination from '../behavior/pagination.js'
import KeywordModel from '../../models/keyword.js'
const keywordModel = new KeywordModel()
import BookModel from '../../models/book.js'
const bookModel = new BookModel()

Component({
  behaviors: [pagination],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: Number,
      observer: 'loadMore'
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    his: [],
    hot: [],
    q: ''
  },
  attached() {

    this.setData({
      his: keywordModel.getHis()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hot: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClear() {
      this.setData({
        q: ''
      })
      this.initialize()
    },
    onConfirm(event) {
      const q = event.detail.value
      if (!q) return
      this._getBookSearch({
        start: this.getCurrentStart(),
        q
      })
      this.setData({
        q
      })
    },
    onCancel() {
      this.triggerEvent('cancel')
    },
    loadMore() {
      // 判断是否锁住
      if (this.hasLocked()) return
      // 判断是否还有更多数据
      if (this.hasMore()) {
        // 锁住防止多次请求
        this.locked()
        // 请求更多数据
        this._getBookSearch({
          start: this.getCurrentStart(),
          q: this.data.q
        })

      }
    },
    _getBookSearch({
      start,
      q
    }) {
      bookModel.getBookSearch({
        start,
        q,
        summary: 1
      }).then(res => {
        // 设置数据
        this.setMoreData(res.books)
        // 设置总页数
        this.setTotal(res.total)
        // 解锁
        this.unLock()
      }).catch(err => {
        // 发生错误解锁
        this.unLock()
      })
    }
  }
})