// pages/user/user.js
var api = require("../../utils/api.js")
var app = getApp()

Page({
  data: {
    userInfo: {}
  },
  handleEdit: function () {
    wx.navigateTo({
      url: '../editUser/editUser'
    })
  },
  onLoad: function () {
    var _this = this
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res2) {
              console.log(res2)
              var encryptedData = res2.encryptedData
              var iv = res2.iv
              wx.request({
                url: api.api + '/session',
                data: {
                  code: code,
                  encryptedData: encryptedData,
                  iv: iv
                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                  console.log('success' + res)
                  console.log(res)// success
                  wx.setStorageSync('token', res.data.token)
                }
              })

              var token = wx.getStorageSync('token')
              
              wx.request({
                url: api.api + `/user/info?token=${token}`,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                  console.log('hhhh')
                  console.log(res)
                  _this.setData({
                    userInfo: res.data
                  })
                  // success
                }
              })
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
      // that.setData({
      //   userInfo: userInfo
      // })
    })
  },
  releasedVideo: function () {
    wx.navigateTo({
      url: '../releaseVideo/releaseVideo'
    })
  },
  handleFollow: function(){
    wx.navigateTo({
      url: '../follow/follow',
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