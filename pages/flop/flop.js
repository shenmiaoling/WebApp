// pages/flop/flop.js
var api = require("../../utils/api.js")
Page({
  data: {
      listLi: [],
      fan: false,
  },
  
  onLoad: function(e) {
    this.getList(1)
  },
  changePosition: function (e) {
    console.log(e)
     console.log(e.detail.current)
  },
  getList: function (page, stopPull) {
    var that = this
    wx.request({
      url: api.api + '/video',
      data: {
        page: page,
        per: '20'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (page === 1) {
          that.setData({
            page: page + 1,
            listLi: res.data,
            done: false
          })
          if (stopPull) {
            wx.stopPullDownRefresh()
          }
        } else {
          if (res.data < 5) {
            that.setData({
              page: page + 1,
              listLi: that.data.listLi.concat(res.data),
              done: true
            })
          } else {
            that.setData({
              page: page + 1,
              listLi: that.data.listLi.concat(res.data)
            })
          }
        }
      },
    })
  },
  handleFan(event){
    var that =this
    var poster_id = event.currentTarget.dataset.id
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/fan/${poster_id}?token=${token}`,
      method: 'POST',
      success: function(res){
        that.setData({
          fan:!that.data.fan,
          poster_id: poster_id
        })
      }
    })
  }
})