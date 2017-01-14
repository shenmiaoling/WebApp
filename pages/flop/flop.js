// pages/flop/flop.js
var api = require("../../utils/api.js")
Page({
  data: {
    listLi: [],
    fan: false,
  },

  onLoad: function (e) {
    this.getList(1)
  },
  getList: function (page, stopPull) {
    var that = this
    wx.request({
      url: api.api + '/video/?per=20&page=2',
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          listLi: res.data,
        })
      },
    })
  },
  handleFan(event) {
    var that = this
    var poster_id = event.currentTarget.dataset.id
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/fan/${poster_id}?token=${token}`,
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
          fan: !that.data.fan,
          poster_id: poster_id
        })
      }
    })
  }
})