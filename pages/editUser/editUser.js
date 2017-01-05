// pages/editUser/editUser.js
var api = require("../../utils/api")
var app = getApp()
Page({
  data: {
    avatar: '',
    nickname: '',
    userInfo: {},
    signature: '',
    array: ['男', '女'],
    objectArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      }
    ],
  },
  bindNickname: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  bindSignature: function (e) {
    this.setData({
      signature: e.detail.value
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/info?token=${token}`,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        if (res.data.sex === 2) {
          that.setData({
            index: 0
          })
        } else {
          that.setData({
            index: 1
          })
        }
        that.setData({
          avatar: res.data.head_pic,
          userInfo: res.data
        })
      }
    })
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        _this.setData({
          avatar: res.tempFilePaths
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  saveInfo: function () {
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/change?token=${token}`,
      data: {
        nickname: this.data.nickname,
        sex: this.data.array[this.data.index],
        signature: this.data.signature
      },
      method: 'PATCH',
      success: function (res) {
        wx.navigateBack()
      }
    })
    this.postAvatar()
  },
  postAvatar: function (){
    console.log('hh')
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/headimg/r?token=${token}`,
      data: {
        headimg : this.data.avatar
      },
      method: 'PATCH',
      success: function(res){
        console.log(this.data.avatar)
      }
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({ title: '编辑个人资料' })
  }
})