// pages/detail/detail.js
var api = require("../../utils/api.js")
Page({
  data: {
    videoDetail: {},
    postBtn: false,
    remark: '',
    commentList: [],
    id: ""
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getVideo(options.id)
  },
  getVideo(id) {
    var that = this
    wx.request({
      url: api.api + `/video/${id}`,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          videoDetail: res.data,
          commentList: res.data.comments.map((item) => {
            item.remark_time = item.remark_time.substr(0, 10)
            return item
          })
        })
      }
    })
  },
  bindinput: function (e) {
    var that = this
    that.setData({
      remark: e.detail.value
    })
    if (e.detail.value.length !== 0) {
      this.setData({
        postBtn: true
      })
    } else {
      this.setData({
        postBtn: false
      })
    }
  },
  handlePost: function () {
    var that = this
    var token = wx.getStorageSync('token')
    if (this.data.postBtn) {
      wx.request({
        url: api.api + `/user/comment/?vid=${this.data.videoDetail._id}&token=${token}`,
        data: { remark: this.data.remark },
        method: 'POST',
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '评论成功！',
            icon: 'success',
            duration: 2000
          })
          that.getVideo(that.data.id)
        },
        fail: function () {
          // fail
        },
        complete: function () {
        }
      })
    }
  },
  handleProfile: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/profile/profile?id=${id}`
    })
  },
  onReady: function () {
    // 页面渲染完成
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