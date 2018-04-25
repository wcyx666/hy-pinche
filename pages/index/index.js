var bmap = require('../lib/bmap-wx.js');
var QQMapWX = require('../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
        'https://www.hyexw.com/image/banner1.png',
        'https://www.hyexw.com/image/banner2.png',
    ],
    weatherData: '', //百度天气 
    autoplay: true,
    interval: 3000,
    duration: 1000,
    vertical:false,
    circular:true,
    indicator:true,
    newsVertical:true,
    newsInterval: 5000,
    newsautoplay:true,
    items: [ // 地区车主
      { id:"0", 
        name: '北京', 
        value: '北京', 
        checked: 'true',
        url:"/pages/driverInfo/driverInfo?local=北京&title=北京司机信息",
        src:"https://www.hyexw.com/image/icon_bj.png"
      },
      { 
        id:"1", 
        name: '太原', 
        value: '太原',
        url: "/pages/driverInfo/driverInfo?local=太原&title=太原司机信息",
        src: "https://www.hyexw.com/image/icon_ty.png" 
      },
      { 
        id:"2", 
        name: '大同', 
        value: '大同',
        url: "/pages/driverInfo/driverInfo?local=大同&title=大同司机信息",
        src: "https://www.hyexw.com/image/icon_dt.png" 
      },
      { 
        id:"3", 
        name: '怀仁',
        value: '怀仁',
        url: "/pages/driverInfo/driverInfo?local=怀仁&title=怀仁司机信息",
        src: "https://www.hyexw.com/image/icon_hr.png" 
      }
    ],
    activeId:"北京",
  },
  onShareAppMessage: function (res) {
    return {
      title: '@所有人，你不知道的浑源拼车程序',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  radioChange: function (e) {
    var that = this;
    that.setData({
      activeId: e.detail.value
    })
    wx.request({
      url: 'https://www.hyexw.com/sch_chuxing.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        local:e.detail.value
      },
      success: function (res) {
        that.setData({
          array: res.data,
        })
      }
    })
  },
  phone: function (event) {
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.phone,
      success: function () {
        var uid = parseInt(event.currentTarget.dataset.uid) + 1;
        wx.request({
          url: 'https://www.hyexw.com/phoneUid.php',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            uid: uid,
            name: event.currentTarget.dataset.name,
          },
          success: function (res) {

          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showModal({
      title: '浑源顺风车提示您',
      content: '您了解平台用户协议吗？',
      cancelText:"不了解",
      confirmText:"了解",
      success: function (res) {
        if (res.cancel) {
          wx.navigateTo({
            url: '../my/about/about'
          })
        }
      }
    })
    // 读取访问量
    wx.request({
      url: 'https://www.hyexw.com/duqucount.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          count: res.data
        })
      }
    })
    // 排序前5名车主
    wx.request({
      url: 'https://www.hyexw.com/chuxing.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          array: res.data
        })
      }
    })
    // HY头条
    wx.request({
      url: 'https://www.hyexw.com/hynews.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        that.setData({
          news: res.data,
        })
      }
    })
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: '6SGBZ-NG3CJ-EW4FL-KKJMU-JJHE7-HSFNV' // 必填
    });
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            that.setData({
              city: res.result.ad_info.city
            })
          }
      })
        
      }
    })

    // 引用百度地图微信小程序JSAPI模块 
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: 'wDurWN6NL8ENeue9THVGSORwMPv7YY2L'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var weatherData = data.currentWeather[0];
      that.setData({
        weatherData: weatherData    
      });
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})