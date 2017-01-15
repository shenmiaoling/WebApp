// pages/favorites/favorites.js
var api = require("../../utils/api.js")
Page({
  data: {
    listLi: []
  },
  onLoad: function (options) {
    this.getFavorites()
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: '我喜欢的' })
  },
  getFavorites: function () {
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: api.api + `/user/favorite/get?&token=${token}`,
      method: 'GET',
      success: function (res) {
        console.log(res.data.favorites)
        that.setData({
          listLi: res.data.favorites
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
})