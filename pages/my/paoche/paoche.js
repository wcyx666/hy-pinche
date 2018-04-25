// pages/travel/travel.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { id: "0", name: '北京', value: '北京', checked: 'true' },
      { id: "1", name: '太原', value: '太原' },
      { id: "2", name: '大同', value: '大同' },
      { id: "3", name: '怀仁', value: '怀仁' }
    ],
    activeId: "北京",
  },
  /*radioChange: function (e) {
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
        local: e.detail.value
      },
      success: function (res) {
        var arr = [];
        for (var i = 0; i < res.data.length; i++) {
          arr.push(res.data[i].uid);
        }
        that.setData({
          array: res.data,
          max: Math.max.apply(null, arr)
        })
      }
    })
  },*/

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.hyexw.com/sch_my_siji.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        wxname: options.name
      },
      success: function (res) {
        that.setData({
          array: res.data
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