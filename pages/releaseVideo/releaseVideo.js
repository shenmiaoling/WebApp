// pages/releaseVideo/releaseVideo.js
var api = require("../../utils/api.js")
Page({
  data: {},
  onLoad: function (options) {
    this.getInfo()
  },
  getInfo: function () {
    var _this = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/info?token=${token}`,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log('hhhh')
        console.log(res)
        _this.setData({
          userInfo: res.data
        })
        // success
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({  title: '我的视频'})
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