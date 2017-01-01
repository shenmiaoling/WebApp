## 关于【头牌】微信小程序相关事项
首先要将 code, encryptedData, iv 这三个字段发送给服务器，服务器再返回用户的个人信息

  - code 通过调用 wx.login,在返回结果里获取到
  - encryptedData 和 iv 通过调用 wx.getUserInfo 后在返回结果里获取
 
 关于翻牌功能的实现
>由于微信提供的组件 swiper 看起来更像轮播图，手点击拖动的时候并不像翻牌，所以决定弃用它，换成用原生 js 的拖动事件来写，看看能不能实现。

将类似的界面样式模板化

  - 首页视频列表和用户查看自己发布过的视频列表可以共用一个模板
  
  - 用户喜欢的和播放历史可共用一个模板
  
  - 用户关注和粉丝共用一个模板