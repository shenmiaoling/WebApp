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
                  console.log(res)// success
                  wx.setStorageSync('token', res.data.token)
                  _this.getToken(res.data.token)
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
  },
  getToken: function (token) {
    var _this = this
    wx.request({
      url: api.api + `/user/info?token=${token}`,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     
      success: function (res) {
        console.log('hhhh')
        console.log(res)
        _this.setData({
          userInfo: res.data
        })
        // success
      }
    })
  },
  releasedVideo: function () {
    wx.navigateTo({
      url: '../releaseVideo/releaseVideo'
    })
  },
  handleFollows: function () {
    wx.navigateTo({
      url: '../follow/follow',
    })
  },
  handleFans: function () {
    wx.navigateTo({
      url: '../fans/fans',
    })
  },
  handleFavorites: function () {
    wx.navigateTo({
      url: '../favorites/favorites',
    })
  },
  handleHistory: function () {
    wx.navigateTo({
      url: '../histories/histories',
    })
  },
  handleHobby: function () {
    wx.navigateTo({
      url: '../hobbies/hobbies',
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