//index.js
//获取应用实例
var api = require("../../utils/api.js")
var app = getApp()
Page({
  data: {
    pull: false,
    like: false,
    videoUrls: ['http://techslides.com/demos/sample-videos/small.mp4',
      'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      'http://techslides.com/demos/sample-videos/small.mp4']
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  pullLabel: function () {
    console.log("hh")
    this.setData({
      pull: !this.data.pull
    })
    console.log(this.data.pull)
  },
  clickFavorite: function () {
    this.setData({
      like: !this.data.like
    })
    console.log("click")
  },
  onLoad: function () {
    var _this = this
    // wx.request({
    //   url: api.api + '/user/video/get',
    //   data: {},
    //   method: 'GET',
    //   success: function (res) {
    //     console.log(res) // success
    //     _this.setData({
    //       videoUrls: res.data.map(function (item) {
    //         item.video_url.vid_url = "http://" + item.video_url.vid_url
    //         return item.video_url.vid_url
    //       })
    //     })
    //   }
    // })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
