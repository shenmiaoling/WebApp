// pages/allJoke/allJoke.js
Page({
  data:{
    listLi:[],
    page:1,
    scrollTop:0,
    done: false,
    hidden: true
  },
  onLoad:function(options){
    this.getList(1);
  },

  onPullDownRefresh: function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    });
    this.getList(1,true);
  },

  getList: function(page, stopPull){
    var that = this
    wx.request({
      url: 'https://wechat.sparklog.com/jokes',
      data: {
        page: page,
        per: '20'
      },
      method: 'GET', 
      success: function(res){
        console.log(res)
        if(page===1){
          that.setData({
            page: page+1,
            listLi: res.data,
            done: false
          })
          if(stopPull){
            wx.stopPullDownRefresh()           
          }
        }else{
          if(res.data<20){
            that.setData({
              page: page+1,
              listLi: that.data.listLi.concat(res.data),
              done: true
            }) 
          }else{
            that.setData({
              page: page+1,
              listLi: that.data.listLi.concat(res.data)
            }) 
          }    
        }
      },
    })
  },

  loadMore: function(){
    var done = this.data.done;
    if(done){
      return
    }else{
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 500
      });
      var page = this.data.page;
      this.getList(page)
    }
  },

  scrll: function(e){
    var scrollTop = e.detail.scrollTop
    if(scrollTop>600){
      this.setData({
        scrollTop: 1,
        hidden: false       
      })
    }else{
      this.setData({
        scrollTop: 1,
        hidden: true    
      });
    }
  },

  goTop: function(){
    this.setData({
      scrollTop:0,
      hidden: true 
    })
  }
})