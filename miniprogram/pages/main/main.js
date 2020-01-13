// miniprogram/pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:100,
    currentMonth:1000,
    currentRemain:200,
    _openid:null,
    moneys:[
      {
        year:2019,
        month:9,
        date: 3,
        money:10,
        events:"吃饭"
      }

    ]
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.setData({
          _openid:res.result.openid
        })
        console.log(this.data._openid)
      },
      fail: err => {
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(!this.data._openid){
    //   this.onGetOpenid();
    // }
    // const db = wx.cloud.database();
    // db.collection("accountBook").doc("b9b90696-e99b-40f4-b7c7-16f4dcf03b17").update({
    //   data: {
    //     _openid: this.data._openid

    //   }, success(res) {
    //     console.log(res);

    //   }
    // })
    const db = wx.cloud.database();
    db.collection('accountBook').get().then(res => {
      var todayCount = 0;
      var monthCount = 0;
      var dates = new Date();
      for (var i = 0; i < res.data[0].moneys.length;i++ ){
        if (res.data[0].moneys[i].year == dates.getFullYear() && res.data[0].moneys[i].month == dates.getMonth() + 1 && res.data[0].moneys[i].date == dates.getDate() ){
          todayCount = parseFloat(res.data[0].moneys[i].money) + todayCount;
        }
      }
      for (var i = 0; i < res.data[0].moneys.length; i++) {
        if (res.data[0].moneys[i].year == dates.getFullYear() && res.data[0].moneys[i].month == dates.getMonth() + 1) {
          monthCount = parseFloat(res.data[0].moneys[i].money) + monthCount;
        }
      }

      this.setData({
        moneys: res.data[0].moneys,
        today: todayCount.toFixed(2),
        currentMonth: monthCount.toFixed(2),
      });
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

  },

  recordMoney: function(){
    wx.redirectTo({ url: "../records/records" })
  },
  deletes:function(e){
    console.log(e);
    this.data.moneys.splice(e.currentTarget.dataset.index, 1)
    var that = this;
    this.setData({
      moneys: that.data.moneys
    })
    const db = wx.cloud.database();
    db.collection("accountBook").doc("b9b90696-e99b-40f4-b7c7-16f4dcf03b17").update({
      data: {
        moneys: this.data.moneys

      }, success(res) {
        console.log(res);

      }
    })
    this.onLoad();
    
  }
})