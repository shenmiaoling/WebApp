// pages/post/post.js
var api = require("../../utils/api.js")
Page({
  data: {
    video: false,
    postBtn: false,
    loader: false,
    title: '',
    channel: 'hot'
  },
  onShow: function (options) {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
      maxDuration: 10, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          videoPath: res.tempFilePath,
          video: true
        })
      }
    })
  },
  bindinput: function (e) {
    var that = this
    that.setData({
      title: e.detail.value
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
    wx.request({
      url: api.api + `/user/video/detail?token=${token}`,
      data: {
        title: this.data.title,
        channel: this.data.channel
      },
      method: 'POST',
      success: (res) => {
        console.log(res)
        wx.showNavigationBarLoading()
        wx.setNavigationBarTitle({ title: '上传中' })
        this.handleVideo(res.data._id, token)
      }
    })
  },
  handleVideo: function (id, token) {
    wx.uploadFile({
      url: api.api + `/user/video/push/${id}?token=${token}`,
      filePath: this.data.videoPath,
      name: 'video',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        })
        wx.hideNavigationBarLoading()
        wx.switchTab({
          url: '/pages/index/index'
        })
      },
      fail: function (err) {
        wx.showToast({
          title: '上传失败',
          icon: 'loading',
          duration: 500
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },
  chooseLabel: function (event) {
    var that = this
    that.setData({
      channel: event.currentTarget.dataset.value
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: '发视频' })
  }
})