// miniprogram/pages/records/records.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:null,
    money:null,
    events:null,
    moneys:[],
    bh:" ",
    chooseIndex:"null"

  },
  bindDateChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    
    

    wx.cloud.callFunction({ name: "login" }).then(res => {
      db.collection('accountBook').where({ _openid: res.result.openid }).get().then(res => {
        // res.data 包含该记录的数据
        console.log(res.data[0]._id);
        that.setData({
          bh: res.data[0]._id
        });
        var dates = new Date();
        this.setData({
          date: dates.getFullYear() + '-' + (dates.getMonth() + 1) + '-' + dates.getDate()
        })

        const db = wx.cloud.database();
        db.collection('accountBook').where({ _id: this.data.bh }).get().then(res => {
          console.log(res);
          this.setData({
            moneys: res.data[0].moneys
          });



          //传修改的index
          if (JSON.parse(options.chooseIndex) != "null") {
            let arr = JSON.parse(options.chooseIndex);
            that.setData({
              chooseIndex: arr
            })
            console.log(that.data.moneys);
            that.setData({
              money: that.data.moneys[that.data.chooseIndex].money,
              events: that.data.moneys[that.data.chooseIndex].events
            })
            
          }





        })
      })
    })

   






    // var dates = new Date();
    // this.setData({
    //   date: dates.getFullYear() + '-' + (dates.getMonth()+1)+'-'+dates.getDate()
    // })

    // const db = wx.cloud.database();
    // db.collection('accountBook').where({ _id: this.data.bh }).get().then(res => {
    //   console.log(res);
    //   this.setData({
    //     moneys: res.data[0].moneys
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
  returnMain: function(){
    wx.redirectTo({ url: "../maincs/maincs" })
  },
  moneysAll: function(e){
    this.setData({
      money:e.detail.value
    })
  },
  eventsAll: function (e) {
    this.setData({
      events: e.detail.value
    })
  },
  records:function(){
    var newMoneys = this.data.moneys;
    if(this.data.chooseIndex=="null"){
      
      newMoneys.push({
        date: this.data.date.split("-")[2],
        year: this.data.date.split("-")[0],
        month: this.data.date.split("-")[1],
        events: this.data.events,
        money: this.data.money
      });
      
    }else{
      newMoneys.splice(this.data.chooseIndex,1);
      newMoneys.splice(this.data.chooseIndex, 0, {
        date: this.data.date.split("-")[2],
        year: this.data.date.split("-")[0],
        month: this.data.date.split("-")[1],
        events: this.data.events,
        money: this.data.money
      });
    }
      console.log(newMoneys);
      this.setData({
        moneys: newMoneys
      })

      db.collection("accountBook").doc(this.data.bh).update({
        data: {
          moneys: this.data.moneys
        }, success(res) {
          console.log(res);
        }
      })
    

    wx.redirectTo({ url: "../maincs/maincs" })
  }
  



})