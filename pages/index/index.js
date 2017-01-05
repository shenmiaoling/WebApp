//index.js
//获取应用实例
var api = require("../../utils/api.js")
var app = getApp()
Page({
  data: {
    pull: false,
    like: false,
    vid: '',
    listLi: [],
    // ['http://techslides.com/demos/sample-videos/small.mp4',
    //   'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    //   'http://techslides.com/demos/sample-videos/small.mp4'],
    page: 1,
    scrollTop: 0,
    done: false,
    hidden: true,
    favorites: [],
  },
  onLoad: function (event) {
    this.getList(1)
    this.getLike(event)
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  pullLabel: function () {
    console.log("hh")
    this.setData({
      pull: !this.data.pull
    })
    console.log(this.data.pull)
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
    this.getList(1, true);
  },
  getLike: function(event){
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: api.api + `/user/favorite/get?&token=${token}`,
      data: {},
      method: 'GET', 
      success: function(res){
        console.log("success")
        that.setData({
          favorites:res.data.favorites
        })
        res.data.favorites.map((item,index)=>{
          // if(item._id)
        }) 
      },
    })
  },
  getList: function (page, stopPull) {
    var that = this
    wx.request({
      url: api.api + '/video',
      data: {
        page: page,
        per: '5'
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        if (page === 1) {
          that.setData({
            page: page + 1,
            listLi: res.data,
            done: false
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
      this.getList(page)
    }
  }
})