// pages/news/news.js
var api = require("../../utils/api.js")
Page({
  data:{
    newsList:[],
    news:""
  },
  onLoad:function(options){
    this.getNews()
  },
  getNews:function(){
    var token = wx.getStorageSync('token')
    var that = this
    wx.request({
      url: api.api + `/user/message?token=${token}`,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res)// success
        if(res.data.kind=="1"){
          that.setData({
            news:"关注了你"
          })
        }else if(res.data.kind=="2"){
          that.setData({
            news:"赞了你的视频"
          })
        }else{
          that.setData({
            news:"评论了你的视频"
          })
        }
        that.setData({
          newsList: res.data.map((item) => {
            item.createTime = item.createTime.substr(0, 10)
            return item
          })
        })
      }
    })
  },
  onReady:function(){
    wx.setNavigationBarTitle({  title: '消息通知'})
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