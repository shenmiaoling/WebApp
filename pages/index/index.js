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
    // ['http://techslides.com/demos/sample-videos/small.mp4',
    //   'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    //   'http://techslides.com/demos/sample-videos/small.mp4'],
    page: 1,
    scrollTop: 0,
    done: false,
    hidden: true,
    favorites: [],
    newUrl: '/video/sort'
  },
  onLoad: function () {
    this.getList(1, true, this.data.channel,this.data.newUrl)
    this.getLike()
  },
  pullLabel: function () {
    this.setData({
      pull: !this.data.pull
    })
  },
  clickFavorite: function (event) {
    var _this = this
    var vid = event.currentTarget.dataset.id
    var token = wx.getStorageSync('token')
    wx.request({
      url: api.api + `/user/favorite?vid=${vid}&token=${token}`,
      method: 'POST',
      success: function (res) {
        console.log(res)
        _this.setData({
          like: !_this.data.like,
          vid: vid
        })
      }
    })
  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    this.getList(1, true,this.data.channel,this.data.newUrl);
  },
  getLike: function () {
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: api.api + `/user/favorite/get?&token=${token}`,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log("success")
        console.log(res.data.favorites)
        res.data.favorites.map((v) => {
          return Object.assign(v, { like: true })
        })
        that.setData({
          favorites: res.data.favorites
        })
      },
    })
  },
  getList: function (page, stopPull, channel,newUrl) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 5000
    })
    var that = this
    console.log(channel)
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
            listLi: res.data,
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
              listLi: that.data.listLi.concat(res.data),
              done: true
            })
          } else {
            that.setData({
              page: page + 1,
              listLi: that.data.listLi.concat(res.data)
            })
          }
        }
      },
    })
  },
  handlePull: function(){
    this.setData({
      pull: !this.data.pull
    })
  },
  handleChoose: function (event) {
    this.setData({
      channel: event.currentTarget.dataset.value
    })
    this.getList(1, true, event.currentTarget.dataset.value,this.data.newUrl)
  },
  onReachBottom: function () {
    var done = this.data.done;
    if (done) {
      return
    } else {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500
      });
      var page = this.data.page;
      this.getList(page,true, this.data.channel,this.data.newUrl)
    }
  },
  handlePoster: function () {
    wx.navigateTo({
      url: '../poster/poster',
      success: function (res) {
      }
    })
  },
  handleHistory: function (event) {
    var vid = event.currentTarget.dataset.id
    var token = wx.getStorageSync('token')
    console.log(token)
    wx.request({
      url: api.api + `/user/history?vid=${vid}&token=${token}`,
      data: {},
      method: 'POST',
      success: function (res) {
        console.log(res)// success
      }
    })
  },
  handleDetail:function(event){
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },
  handleSearch:function(){
    wx.navigateTo({
      url: `/pages/search/search`
    })
  }
})