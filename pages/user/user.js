// pages/user/user.js
var api = require("../../utils/api.js")
var app = getApp()
function Login(code, encryptedData, iv) {
  console.log('code=' + code + '&encryptedData=' + encryptedData + '&iv=' + iv);
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
      code: code,
      encryptedData: encryptedData,
      iv: iv
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function (res) {
      // success
      console.log('success')
      wx.hideToast();
      console.log('服务器返回' + res);
    },
    fail: function (err) {
      console.log("返回失败" + err)
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
                  console.log('success'+ res)
                  console.log(res)// success
                },
                fail: function (err) {
                  console.log( err)// fail
                },
                complete: function () {
                  // complete
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
      that.setData({
        userInfo: userInfo
      })
    })
  },
  releasedVideo: function () {
    wx.navigateTo({
      url: '../releaseVideo/releaseVideo'
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