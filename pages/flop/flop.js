// pages/flop/flop.js
var api = require("../../utils/api.js")
Page({
  data: {
    videoUrls:[      'http://techslides.com/demos/sample-videos/small.mp4',
      'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      'http://techslides.com/demos/sample-videos/small.mp4']
  },
  onLoad: function(e) {
    this.getVideo()
    console.log(Window)
  },
  changePosition: function (e) {
    console.log(e.target.offsetLeft)
  },
  getVideo: function(e) {
    var that = this
    wx.request({
      url: api.api + '/user/video/get',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res)
        that.setData({
          videoUrls:res.data.map(function (item) {
            item.video_url.vid_url = "http://" + item.video_url.vid_url
             return item.video_url.vid_url
          })
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})