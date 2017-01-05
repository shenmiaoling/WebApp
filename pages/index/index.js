//index.js
//获取应用实例
var api = require("../../utils/api.js")
var app = getApp()
Page({
  data: {
    pull: false,
    like: false,
    videoUrls: []
    
    // ['http://techslides.com/demos/sample-videos/small.mp4',
    //   'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    //   'http://techslides.com/demos/sample-videos/small.mp4']
  },
  // onPullDownRefresh: function(){
  //   console.log("down")
  // },
  onReachBottom: function(){
    console.log("刷新")
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
    onPullDownRefresh: function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    this.getList(1,true);
  },
    getList: function(page, stopPull){
    var that = this
    wx.request({
      url: 'https://wechat.sparklog.com/jokes',
      data: {
        page: page,
        per: '20'
      },
      method: 'GET', 
      success: function(res){
        console.log(res)
        if(page===1){
          that.setData({
            page: page+1,
            listLi: res.data,
            done: false
          })
          if(stopPull){
            wx.stopPullDownRefresh()           
          }
        }else{
          if(res.data<20){
            that.setData({
              page: page+1,
              listLi: that.data.listLi.concat(res.data),
              done: true
            }) 
          }else{
            that.setData({
              page: page+1,
              listLi: that.data.listLi.concat(res.data)
            }) 
          }    
        }
      },
    })
  },
    loadMore: function(){
    var done = this.data.done;
    if(done){
      return
    }else{
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500
      });
      var page = this.data.page;
      this.getList(page)
    }
  },
  onLoad: function () {
    var _this = this
    wx.request({
      url: api.api + '/video',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res) // success
        _this.setData({
          videoUrls: res.data.map(function (item) {
            item.video_url.vid_url = "http://" + item.video_url.vid_url
            return item.video_url.vid_url
          })
        })
      }
    })
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