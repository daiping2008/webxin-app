// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    first: {
      type: Boolean,
      value: false
    },
    latest: {
      type: Boolean,
      value: true
    },
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftSrc: './images/triangle@left.png',
    disLeftSrc: './images/triangle.dis@left.png',
    rightSrc: './images/triangle@right.png',
    disRightSrc: './images/triangle.dis@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft() {
      if (this.data.latest) return 
      this.triggerEvent('onNext')
    },
    onRight() {
      if (this.data.first) return
      this.triggerEvent('onPrev')
    }
  }
})
