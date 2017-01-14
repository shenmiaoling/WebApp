// pages/search/search.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  handleSearch:function(e){
    console.log(e.detail.value)
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: '搜索' })
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