// pages/post/post.js
var api = require("../../utils/api.js")
Page({
  data: {
    video: false,
    postBtn: false,
    loader:false,
    title:''
  },
  bindButtonTap: function () {
    var token = wx.getStorageInfoSync("token")
    wx.request({
      url: api.api + `/user/video/push/:videoId?token=${token}`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        console.log(res)
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
        console.log(res.tempFilePath
)
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
      title:e.detail.value
    })
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
  handlePost: function(){
    var token = wx.getStorageSync('token')
    console.log(token)
    wx.request({
      url: api.api + `/user/video/detail?token=${token}`,
      data: {title: this.data.title},
      method: 'POST',
      success:(res)=>{
        console.log(res)
        this.handleVideo(res.data._id,token)
      }
    })
  },
  handleVideo:function(id,token){
    console.log(id)
    wx.uploadFile({
      url: api.api + `/user/video/push/${id}?token=${token}`,
      filePath:this.data.videoPath,
      name:'video',
      success: function(res){
        console.log(res)
      },
      fail: function(err) {
        console.log(err)
      },
      complete: function() {
        // complete
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