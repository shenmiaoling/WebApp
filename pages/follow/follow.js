// pages/follow/follow.js
var api = require("../../utils/api.js")
Page({
  data: {},
  onLoad: function (options) {
    this.getUserInfo()
  },
  getUserInfo: function (token) {
    var _this = this
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/follows?token=${token}`,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log(res.data)
        if (res.data.follows.length !== 0) {
          _this.setData({
            userInfo: res.data.follows,
            signature: res.data.signature,
            follow: true
          })
        }
        // success
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: '我的关注' })
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