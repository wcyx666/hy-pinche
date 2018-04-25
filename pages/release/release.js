//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    imgUrls: [
      'http://www.hyexw.com/image/banner_img.png',
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
  }
})
