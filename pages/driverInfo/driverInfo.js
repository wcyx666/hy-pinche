// pages/travel/travel.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    local:"",
    page:4,
    leng:"",
    jupage:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.hyexw.com/sch_chuxing_len.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        local: options.local,
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