export default Behavior({
  data: {
    data: [],
    lock: false, // 锁锁
    total: 0,
  },
  methods: {
    // 设置data数据
    setMoreData(data) {
      if (!data) return
      this.setData({
        data: this.data.data.concat(data)
      })
    },
    // 是否还有更多数据未加载
    hasMore() {
      const {
        data,
        total
      } = this.data
      return data.length === total ? false : true
    },
    // 获取当前开始查询index
    getCurrentStart() {
      return this.data.data.length
    },
    // 设置总共多少条数据
    setTotal(total) {
      this.data.total = total
    },
    // 加锁
    locked() {
      this.setData({
        lock: true
      })
    },
    // 解锁
    unLock() {
      this.setData({
        lock: false
      })
    },
    // 是否锁住 true为锁住，false为未锁住
    hasLocked() {
      return this.data.lock ? true : false
    },
    initialize() {
      this.setData({
        data: [],
        lock: false,
        total: 0
      })
    }
  }
})