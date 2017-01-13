// pages/releaseVideo/releaseVideo.js
var api = require("../../utils/api.js")
Page({
  data: {},
  onLoad: function (options) {
    this.getInfo(),
      this.getVideo()
  },
  getInfo: function () {
    var _this = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/info?token=${token}`,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        _this.getVideo(res.data.pub_videos)
        _this.setData({
          userInfo: res.data
        })
        if (res.data.pub_videos.length !== 0) {
          _this.setData({
            hidden: true
          })
        }
      }
    })
  },
  getVideo: function () {
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: api.api + `/user/pub?token=${token}`,
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          listLi: res.data
        })
      }
    })
  },
  handleDetail: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: '我的视频' })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})