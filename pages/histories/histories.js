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
  handleClear: function () {
    var that = this
    wx.showModal({
      title: '确认清除',
      content: '清除全部播放历史',
      success: function (res) {
        if (res.confirm) {
          var token = wx.getStorageSync('token')
          wx.request({
            url: api.api + `/user/history/all/del?token=${token}`,
            data: {},
            method: 'DELETE',
            success: function(res){
              console.log(res)
              that.setData({
                listLi:[]
              })
            },
            fail: function() {
              // fail
            },
            complete: function() {
              // complete
            }
          })
        }
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: '播放历史' })
  }
})