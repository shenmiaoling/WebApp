// pages/search/search.js
var api = require("../../utils/api.js")
Page({
  data: {
    keyWord: '',
    user: {},
    video: {},
    userTitle: false,
    videoTitle: false,
    search: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  handleSearch: function (e) {
    this.setData({
      keyWord: e.detail.value
    })
  },
  handleSubmit: function () {
    if (this.data.keyWord == '') {
      wx.showModal({
        title: '提示',
        content: '输入不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    } else {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 2000
      })
      this.getUser()
      this.getVideo()
    }

  },
  getUser: function () {
    var that = this
    wx.request({
      url: api.api + `/search/info?q=${this.data.keyWord}`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.hideToast()
        if (res.data.length == 0) {
          that.setData({
            userTitle: true
          })
        }
        console.log(res)
        that.setData({
          user: res.data,
          search: false
        })

      }
    })
  },
  getVideo: function () {
    var that = this
    wx.request({
      url: api.api + `/search/video?q=${this.data.keyWord}`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.hideToast()
        if (res.data.length == 0) {
          that.setData({
            videoTitle: true
          })
        }
        console.log(res)
        that.setData({
          video: res.data,
          search: false
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
  onReady: function () {
    wx.setNavigationBarTitle({ title: '搜索' })
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