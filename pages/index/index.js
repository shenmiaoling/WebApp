//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    pull:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  pullLabel: function() {
    console.log("hh")
    this.setData({
      pull: !this.data.pull
    })
    console.log(this.data.pull)
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
