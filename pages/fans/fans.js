// pages/fans/fans.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    wx.setNavigationBarTitle({  title: '我的粉丝'})
  },
  handlePublic: function(){
    wx.switchTab({
  url: '/pages/post/post'
})
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})