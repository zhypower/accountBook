// pages/index/lookrecord/lookrecord.js
var wxCharts = require('../../utils/wxcharts-min.js');   //引入wxChart文件
var app = getApp();
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: ['2018-6-13', '2018-7-14', '2018-6-15', '2018-6-16', '2018-6-17', '2018-6-18', '2018-6-19'],
    series: [
      { name: '生活用品', data: 100.78 },
      { name: '交通出行', data: 30.45 },
      { name: '日常饮食', data: 20 },
      { name: '其他杂碎', data: 18 }
    ]

  },
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  updateData: function (e) {

  },
  reback: function () {
    wx.redirectTo({ url: "../maincs/maincs" })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var dayCount = 0;
    var trainCount = 0;
    var eatCount = 0;
    var elseCount = 0;
    console.log(JSON.parse(e.chooseMoney));
    for (var i = 0; i < JSON.parse(e.chooseMoney).length;i++){
      if (JSON.parse(e.chooseMoney)[i].events=="吃饭"){
        eatCount = eatCount + parseFloat(JSON.parse(e.chooseMoney)[i].money);
      }
      if (JSON.parse(e.chooseMoney)[i].events == "交通") {
        trainCount = trainCount + parseFloat(JSON.parse(e.chooseMoney)[i].money);
      }
      if (JSON.parse(e.chooseMoney)[i].events == "生活") {
        dayCount = dayCount + parseFloat(JSON.parse(e.chooseMoney)[i].money);
      }
      if (JSON.parse(e.chooseMoney)[i].events == "其他") {
        elseCount = elseCount + parseFloat(JSON.parse(e.chooseMoney)[i].money);
      }
    }
    console.log(eatCount)
    this.setData({
      series: [
        { name: '生活用品', data: dayCount },
        { name: '交通出行', data: trainCount },
        { name: '日常饮食', data: eatCount },
        { name: '其他杂碎', data: elseCount }
      ]
    })


    var windowWidth = '', windowHeight = '';    //定义宽高
    try {
      var res = wx.getSystemInfoSync();    //试图获取屏幕宽高数据
      windowWidth = res.windowWidth;
      //以设计图750为主进行比例算换
      windowHeight = res.windowWidth / 750 * 550
      //以设计图750为主进行比例算换
    } catch (e) {
      console.error('getSystemInfoSync failed!');   //如果获取失败
    }
    lineChart = new wxCharts({     //定义一个wxCharts图表实例
      canvasId: 'lineCanvas',     //输入wxml中canvas的id
      type: 'pie',       //图标展示的类型有:'line','pie','column','area','ring','radar'
      series: this.data.series,
      width: windowWidth-50,  //图表展示内容宽度
      height: windowHeight,  //图表展示内容高度
      dataLabel: true,
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

  },
})