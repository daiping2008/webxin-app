// components/classic/music/index.js
import ClassicBeh from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  behaviors: [ClassicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: './images/player@waitting.png',
    playSrc: './images/player@playing.png'
  },
  attached() {
    this._recoverPlaying()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      const { playing } = this.data
      if (!playing) {

        this._initPlay()

        mMgr.play()
        this.setData({
          playing: true
        })
      } else {
        mMgr.pause()
        this.setData({
          playing: false
        })
      }
    },
    _initPlay() {
      const { src, title } = this.properties
      const arr = title.split(' ')
      mMgr.title = arr[0]
      mMgr.epname = arr[0]
      mMgr.singer = arr[1]
      mMgr.src = src
    },
    _recoverPlaying() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src === this.properties.src) {
        if (!mMgr.paused) {
          this.setData({
            playing: true
          })
        }
      }
    },
    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverPlaying()
      })
      mMgr.onPause(() => {
        this._recoverPlaying()
      })
      mMgr.onStop(() => {
        this._recoverPlaying()
      })
      mMgr.onEnded(() => {
        this._recoverPlaying()
      })
    }
  }
})