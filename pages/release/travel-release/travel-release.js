// pages/release/travel-release/travel-release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"",
    localc: "",
    local:"",
    name:"",
    wxlogo:"",
    wxname:"",
    phone:"",
    server:"",
    models: "",
    pctime:"",  // 出发时间
    pctimes: "", // 返程时间
    lot:"", // 座位
    arrayLocal: ['北京', '太原', '大同', '怀仁'],
    arrayLocalc: ['大同', '浑源'],
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
              wxname: res.userInfo.nickName
            })
          }
        })
      }
    })
  },
  bindLocalChange: function (e) {
    var that = this;
    console.log(e.detail)
    if (e.detail.value == 0) {
      that.setData({
        local: "北京"
      })
    } else if (e.detail.value == 1) {
      that.setData({
        local: "太原"
      })
    } else if (e.detail.value == 2) {
      that.setData({
        local: "大同"
      })
    } else if (e.detail.value == 3) {
      that.setData({
        local: "怀仁"
      })
    }
  },
  bindLocalcChange: function (e) {
    var that = this;
    if (e.detail.value == 0) {
      that.setData({
        localc: "大同"
      })
    } else if (e.detail.value == 1) {
      that.setData({
        localc: "浑源"
      })
    }
  },
  bindTimeChange: function (e) {
    this.setData({
      pctime: e.detail.value
    })
  },
  bindTimesChange: function (e) {
    this.setData({
      pctimes: e.detail.value
    })
  },
  bindWxName: function (e) {
    this.setData({
      wxname: e.detail.value
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
  bindMan: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['1位', '2位', '3位', '4位', '5位', '6位'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.setData({
            lot: 1
          })
        } else if (res.tapIndex == 1) {
          that.setData({
            lot: 2
          })
        } else if (res.tapIndex == 2) {
          that.setData({
            lot: 3
          })
        } else if (res.tapIndex == 3) {
          that.setData({
            lot: 4
          })
        } else if (res.tapIndex == 4) {
          that.setData({
            lot: 5
          })
        } else if (res.tapIndex == 5) {
          that.setData({
            lot: 6
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  sublimt: function () {
    var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    var result = express.test(this.data.server);
    if (this.data.server < 7){
      wx.showToast({
        title: '车牌不正确',
        icon: 'loading',
        image: "/pages/img/shibai.png",
        duration: 2000,
        mask: true
      })
    } else if (result == false){
      wx.showToast({
        title: '车牌不正确',
        icon: 'loading',
        image: "/pages/img/shibai.png",
        duration: 2000,
        mask: true
      })
    } else if (this.data.lot == "" || this.data.pctimes == "" || this.data.pctime == "" || this.data.local == "" || this.data.localc == "" || this.data.name == "" || this.data.phone == "" || this.data.server == "" || this.data.bindModels == "" || this.data.wxname == ""){
      wx.showToast({
        title: '请填写信息',
        icon: 'loading',
        image: "/pages/img/shibai.png",
        duration: 2000,
        mask: true
      })
    } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.data.phone))){
      wx.showToast({
        title: '手机号码不正确',
        icon: 'loading',
        image: "/pages/img/shibai.png",
        duration: 2000,
        mask: true
      })
    }else {
      wx.request({
        url: 'https://www.hyexw.com/re_chuxing.php',
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
          wxname: this.data.wxname,
          wxlogo: this.data.wxlogo,
          pctime: this.data.pctime,
          pctimes: this.data.pctimes,
          lot: this.data.lot
        },
        success: function (res) {
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