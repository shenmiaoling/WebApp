// pages/flop/flop.js
var api = require("../../utils/api.js")
Page({
  data: {
    listLi: [],
    fan: false,
  },

  onLoad: function (e) {
    this.getList(1)
    this.getLike()
  },
  getLike: function () {
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: api.api + `/user/favorite/get?&token=${token}`,
      method: 'GET',
      success: function (res) {
        that.setData({
          favorites: res.data.favorites.map((v) => {
            return v._id
          })
        })
      },
    })
  },
  getList: function (page, stopPull) {
    var that = this
    wx.request({
      url: api.api + '/video/?per=20&page=2',
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          listLi: res.data.map((v) => {
              return Object.assign(v, { like: that.data.favorites.includes(v._id) })
            })
        })
      },
    })
  },
  handleDetail: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
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