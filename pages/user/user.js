// pages/user/user.js
var api = require("../../utils/api.js")
var app = getApp()
var API_URL = 'http://192.168.1.109:3333/session'
function  Login(code,encryptedData,iv){  console.log('code='+code+'&encryptedData='+encryptedData+'&iv='+iv);
 //创建一个dialog
          wx.showToast({
            title: '正在登录...',
            icon: 'loading',
            // duration: 5000
          });
          //请求服务器
          wx.request({
            url: API_URL,
            data: {
              code:code,
              encryptedData:encryptedData,
              iv:iv
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/json'
            }, // 设置请求的 header
            success: function (res) {
              // success
              wx.hideToast();
              console.log('服务器返回');
            }
          })
  }
Page({
  data: {
    userInfo: {},
    token: ''
  },
  handleEdit: function () {
    wx.navigateTo({
      url: '../editUser/editUser'
    })
  },
  onLoad: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res2) {
              console.log(res2)
              var encryptedData = encodeURIComponent(res2.encryptedData)
              var iv = res2.iv
              Login(code,encryptedData,iv)
            }
          })

        }
        else {
          console.log('获取用户登录失败' + res.eres.errMsg)
        }
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