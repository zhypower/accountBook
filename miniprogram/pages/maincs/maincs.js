// miniprogram/pages/main/main.js
const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today:100,
    currentMonth:1000,
    currentRemain:2000,
    _openid:null,
    bh:" ",
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
  remainMoney:function(){

  },
  fenxi:function(){
    wx.redirectTo({
      url: "../echarts/echarts?chooseMoney=" + JSON.stringify(this.data.moneys) })


  },
  tianjia: function () {
    var that = this;
    console.log(that.data.bh);
    // if (that.data.bh == " ") {
    if (app.appData.bh == " ") {
      wx.cloud.callFunction({ name: "login" }).then(res => {
        
        var id = res.result.openid;
        db.collection('accountBook').add({
          data: {
            moneys: []
          }
        }).then(res => {
          console.log(res);
          that.setData({
            bh: res._id
          })
        }).catch(console.error)
      })
    }
    // wx.showToast({
    //   title: "创建成功"
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.cloud.callFunction({ name: "login" }).then(res => {
      db.collection('accountBook').where({ _openid: res.result.openid }).get().then(res=>{
        if (res.data.length==0){
          that.tianjia();
        }
        // app.appData.bh = res.data[0]._id;
        app.appData.bh = this.data.bh;
          // res.data 包含该记录的数据
          that.setData({ 
            bh: res.data[0]._id,
            _openid: res.openid,
          });
          console.log(that.data.bh);
          db.collection('accountBook').where({ _openid: that.data._openid,_id:that.data.bh }).get().then(res => {
            console.log(res);
            var todayCount = 0;
            var monthCount = 0;
            var dates = new Date();
            for (var i = 0; i < res.data[0].moneys.length; i++) {
              if (res.data[0].moneys[i].year == dates.getFullYear() && res.data[0].moneys[i].month == dates.getMonth() + 1 && res.data[0].moneys[i].date == dates.getDate()) {
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
              currentRemain: 2000 - monthCount.toFixed(2)
            });
          })
      })
    })

    
    // db.collection('accountBook').where({ _openid: that.data._openid }).get().then(res => {
    //   console.log(res);
    //   var todayCount = 0;
    //   var monthCount = 0;
    //   var dates = new Date();
    //   for (var i = 0; i < res.data[0].moneys.length;i++ ){
    //     if (res.data[0].moneys[i].year == dates.getFullYear() && res.data[0].moneys[i].month == dates.getMonth() + 1 && res.data[0].moneys[i].date == dates.getDate() ){
    //       todayCount = parseFloat(res.data[0].moneys[i].money) + todayCount;
    //     }
    //   }
    //   for (var i = 0; i < res.data[0].moneys.length; i++) {
    //     if (res.data[0].moneys[i].year == dates.getFullYear() && res.data[0].moneys[i].month == dates.getMonth() + 1) {
    //       monthCount = parseFloat(res.data[0].moneys[i].money) + monthCount;
    //     }
    //   }

    //   this.setData({
    //     moneys: res.data[0].moneys,
    //     today: todayCount.toFixed(2),
    //     currentMonth: monthCount.toFixed(2),
    //   });
    // })



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
    wx.redirectTo({ url: "../records/records?chooseIndex=" + JSON.stringify("null") })
  },
  changeMoney: function (e) {
    wx.redirectTo({ url: "../records/records?chooseIndex=" + JSON.stringify(e.currentTarget.dataset.index) })
  },
  deletes:function(e){
    console.log(e);
    this.data.moneys.splice(e.currentTarget.dataset.index, 1)
    var that = this;
    this.setData({
      moneys: that.data.moneys
    })
    const db = wx.cloud.database();
    db.collection("accountBook").doc(that.data.bh).update({
      data: {
        moneys: this.data.moneys

      }, success(res) {
        console.log(res);

      }
    })
    this.onLoad();
    
  }
})