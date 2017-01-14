// pages/profile/profile.js
var api = require("../../utils/api.js")
Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    this.getProfiles(options.id)
    // 页面初始化 options为页面跳转所带来的参数
  },
  getProfiles: function (id) {
    var that = this
    wx.request({
      url: api.api + `/info/${id}`,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        if (res.data.pub_videos.length !== 0) {
          that.setData({
            hidden: true
          })
        }
        that.setData({
          userInfo: res.data,
          listLi: res.data.pub_videos
        })
      }
    })
  },
  handleDetail:function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '用户信息',
      success: function (res) {
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