// pages/fans/fans.js
var api = require("../utils/api.js")
Page({
  data: {},
  onLoad: function (options) {
    this.getFans()
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: '我的粉丝' })
  },
  handlePublic: function () {
    wx.switchTab({
      url: '/pages/post/post'
    })
  },
   getFans: function (token) {
    var _this = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/follows?token=${token}`,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log(res.data)
        if (res.data.fans.length !== 0) {
          _this.setData({
            userInfo: res.data,
            fans: true
          })
        }
        // success
      }
    })
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