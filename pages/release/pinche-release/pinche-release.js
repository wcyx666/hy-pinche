// pages/release/travel-release/travel-release.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxlogo:"",
    localc: "",
    local: "",
    name: "",
    phone: "",
    server: "",
    models: "",
    date:"",
    time:"",
    man:"",
    latitude:'',
    longitude:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            that.setData({
              wxlogo: res.userInfo.avatarUrl,
              name: res.userInfo.nickName
            })
          }
        })
      }
    })
  },
  bindLocal: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        // success
        that.setData({
          local: res.name
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  bindLocalc: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        // success
        that.setData({
          localc:res.name      
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  bindName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindServer: function (e) {
    this.setData({
      server: e.detail.value
    })
  },
  bindModels: function (e) {
    this.setData({
      models: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindMan: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['1位', '2位', '3位', '4位', '5位','6位'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.setData({
            man: 1
          })
        } else if (res.tapIndex == 1) {
          that.setData({
            man: 2
          })
        } else if (res.tapIndex == 2) {
          that.setData({
            man: 3
          })
        } else if (res.tapIndex == 3) {
          that.setData({
            man: 4
          })
        } else if (res.tapIndex == 4) {
          that.setData({
            man: 5
          })
        } else if (res.tapIndex == 5) {
          that.setData({
            man: 6
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  sublimt: function () {
    var date = new Date(this.data.date);
    var date = new Date(this.data.date.replace(/-/g, '/'));
    var time1 = date.getTime();
    console.log(time1)
    var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    var result = express.test(this.data.server);
    if (this.data.server < 7) {
      wx.showToast({
        title: '车牌不正确',
        icon: 'loading',
        image: "/pages/img/shibai.png",
        duration: 2000,
        mask: true
      })
    } else if (result == false) {
      wx.showToast({
        title: '车牌不正确',
        icon: 'loading',
        image: "/pages/img/shibai.png",
        duration: 2000,
        mask: true
      })
    } else if (this.data.local == "" || this.data.name == "" || this.data.phone == "" || this.data.server == "" || this.data.bindModels == "" || this.data.time == "" || this.data.man == "" || this.data.date == "") {
      wx.showToast({
        title: '请填写信息',
        icon: 'loading',
        image: "/pages/img/shibai.png",
        duration: 2000,
        mask: true  
      })
    } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.data.phone))) {
      wx.showToast({
        title: '手机号码不正确',
        icon: 'loading',
        image: "/pages/img/shibai.png",
        duration: 2000,
        mask: true
      })
    } else {
      wx.request({
        url: 'https://www.hyexw.com/re_pinche.php',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          localc: this.data.localc,
          local: this.data.local,
          name: this.data.name,
          phone: this.data.phone,
          server: this.data.server,
          models: this.data.models,
          man: this.data.man,
          wxlogo: this.data.wxlogo,
          date: this.data.date,
          time: this.data.time
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.status == 1) {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000,
              mask: true,
              success: function () {
                wx.navigateBack({
                  delta: 2
                })
              }
            })
          } else {
            wx.showToast({
              title: '信息已存在',
              icon: 'loading',
              image: "/pages/img/shibai.png",
              duration: 2000,
              mask: true
            })
          }
        }
      })
    }
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