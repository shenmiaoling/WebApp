// pages/user/user.js
var api = require("../../utils/api.js")
var app = getApp()
Page({
  data:{
    userInfo: {},
    token: ''
  },
  handleEdit: function () {
    wx.navigateTo({
      url: '../editUser/editUser'
    })
  },
  onLoad: function () {
    this.getToken()
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  getToken: function () {
    wx.request({
      url: api.api+'/user/video/get',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {}, // 设置请求的 header
      success: function(res){
        console.log(res)
      },
      fail: function() {
        console.log("fail")
      },
      complete: function() {
        console.log("complete") 
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
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