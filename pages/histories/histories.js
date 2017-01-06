// pages/histories/histories.js
var api = require("../../utils/api.js")
Page({
  data: {
    listLi: []
  },
  onLoad: function (options) {
    this.getHistories()
  },
  getHistories: function () {
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: api.api + `/user/history/all?token=${token}`,
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          listLi: res.data
        })
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: '播放历史' })
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