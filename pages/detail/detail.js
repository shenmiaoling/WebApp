// pages/detail/detail.js
var api = require("../../utils/api.js")
Page({
  data: {
    videoDetail: {},
    postBtn: false,
    remark: '',
    commentList: [],
    commenter: []
  },
  onLoad: function (options) {
    console.log(options.id)
    this.getVideo('5870c49f493b655769dfc223')
  },
  getVideo(id) {
    var that = this
    wx.request({
      url: api.api + `/video/${id}`,
      data: {},
      method: 'GET',
      success: function (res) {
        that.setData({
          videoDetail: res.data,
          commentList: res.data.comments.map((item) => {
            wx.request({
              url: api.api + `/video/comment/${item._id}`,
              method: 'GET',
              success: function (res) {
                that.setData({
                  commenter:res.data.commenter
                })
              }
            })
            item.commenter = that.data.commenter,
            item.remark_time = item.remark_time.substr(0, 10)
            return item
          })
        })
        console.log(that.data.commentList)
      }
    })
  },
  getCommenter: function (cid) {
    var that = this
    wx.request({
      url: api.api + `/video/comment/${cid}`,
      method: 'GET',
      success: function (res) {
        that.data.commenter.push(res)
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
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
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