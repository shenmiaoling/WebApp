// pages/post/post.js
Page({
  data: {
    video: false
  },
  bindButtonTap: function () {

  },
  onLoad: function (options) {
    var that = this
    // wx.chooseVideo({
    //   sourceType: ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄
    //   maxDuration: 240, // 拍摄视频最长拍摄时间，单位秒。最长支持60秒
    //   camera: ['front', 'back'],
    //   success: function (res) {
    //     that.setData({
    //       src: res.tempFilePath,
    //       video: true
    //     })
    //   }
    // })
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