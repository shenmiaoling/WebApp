// pages/post/post.js
var api = require("../../utils/api.js")
Page({
  data: {
    video: false,
    postBtn: false,
    loader:false
  },
  bindButtonTap: function () {
    var token = wx.getStorageInfoSync("token")
    console.log(token)
    wx.request({
      url: api.api + `/user/video/push/:videoId?token=${token}`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
      }
    })
  },
  onLoad: function (options) {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
      maxDuration: 240, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath,
          video: true
        })
      }
    })
  },
  bindinput: function (e) {
    console.log(e.detail.value.length)
    if (e.detail.value.length !== 0) {
      this.setData({
        postBtn: true
      })
    }else{
      this.setData({
        postBtn: false
      })
    }
  },
  postVideo: function(){
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/video/push/:videoId?token=${token}`,
      data: {},
      method: 'POST',
      success: function(res){
        console.log(res)
      }
    })
  },
  getLabel: function () {
    console.log("hh")
  },
  onReady: function () {
    wx.setNavigationBarTitle({  title: '发视频'})
  }
})