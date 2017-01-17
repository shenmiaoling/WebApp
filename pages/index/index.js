//index.js
//获取应用实例
var api = require("../../utils/api.js")
var app = getApp()
Page({
  data: {
    pull: false,
    vid: '',
    listLi: [],
    channel: 'hot',
    page: 1,
    scrollTop: 0,
    done: false,
    hidden: true,
    favorites: [],
    newUrl: '/video/sort'
  },
  onShow: function () {
    this.getLike()
    this.getList(1, true, this.data.channel, this.data.newUrl)
  },
  pullLabel: function () {
    this.setData({
      pull: !this.data.pull
    })
  },
  handleFavorite: function (event) {
    var _this = this
    var vid = event.currentTarget.dataset.id
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/favorite?vid=${vid}&token=${token}`,
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        _this.setData({
          listLi: _this.data.listLi.map((v) => {
            if (v._id == vid) {
              v.like = !v.like
            }
            return v
          })
        })
      }
    })
  },
  onPullDownRefresh: function () {
    this.getList(1, true, this.data.channel, this.data.newUrl);
  },
  getLike: function () {
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: api.api + `/user/favorite/get?&token=${token}`,
      method: 'GET',
      success: function (res) {
        that.setData({
          favorites: res.data.favorites.map((v) => {
            return v._id
          })
        })
      },
    })
  },
  getList: function (page, stopPull, channel, newUrl) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    })
    var that = this
    wx.request({
      url: api.api + `${newUrl}?channel=${channel}`,
      data: {
        page: page,
        per: '5'
      },
      method: 'GET',
      success: function (res) {
        wx.hideToast()
        console.log(res.data)
        if (page === 1) {
          that.setData({
            page: page + 1,
            listLi: res.data.map((v) => {
              return Object.assign(v, { like: that.data.favorites.includes(v._id) })
            }),
            done: false,
            newUrl: '/video/sort/new'
          })
          if (stopPull) {
            wx.stopPullDownRefresh()
          }
        } else {
          if (res.data < 5) {
            that.setData({
              page: page + 1,
              listLi: that.data.listLi.concat(res.data.map((v) => {
                return Object.assign(v, { like: that.data.favorites.includes(v._id) })
              })),
              done: true
            })
          } else {
            that.setData({
              page: page + 1,
              listLi: that.data.listLi.concat(res.data.map((v) => {
                return Object.assign(v, { like: that.data.favorites.includes(v._id) })
              }))
            })
          }
        }
      },
    })
  },
  handlePull: function () {
    this.setData({
      pull: !this.data.pull
    })
  },
  handleChoose: function (event) {
    this.setData({
      channel: event.currentTarget.dataset.value
    })
    this.getList(1, true, event.currentTarget.dataset.value, this.data.newUrl)
  },
  onReachBottom: function () {
    var done = this.data.done;
    if (done) {
      return
    } else {
      var page = this.data.page;
      this.getList(page, true, this.data.channel, this.data.newUrl)
    }
  },
  handleHistory: function (event) {
    var vid = event.currentTarget.dataset.id
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/history?vid=${vid}&token=${token}`,
      data: {},
      method: 'POST',
      success: function (res) {
        console.log(res)// success
      }
    })
  },
  handleDetail: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  handleSearch: function () {
    wx.navigateTo({
      url: `/pages/search/search`
    })
  }
})